import { ConflictException, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CrearPacienteDto } from './dto/crear-paciente.dto';
import { Paciente } from './paciente.entity';

const PREFIJO_HC = 'HC-';
const DIGITOS_HC = 6;

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacientes: Repository<Paciente>,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  buscarPorDni(dni: string): Promise<Paciente | null> {
    return this.pacientes.findOne({ where: { dni } });
  }

  async consultarReniec(dni: string): Promise<{ nombres: string; apellidos: string } | null> {
    const url = `https://api.decolecta.com/v1/reniec/dni?numero=${dni}`;
    const token = process.env.DECOLECTA_API_TOKEN;

    if (!token) {
      console.warn('DECOLECTA_API_TOKEN no está configurado.');
      return null;
    }

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`Error al consultar RENIEC (status ${response.status})`);
      }

      const data = await response.json();
      return {
        nombres: data.first_name,
        apellidos: `${data.first_last_name} ${data.second_last_name}`.trim(),
      };
    } catch (error) {
      console.error('Error en consultarReniec:', error);
      return null;
    }
  }

  /**
   * Da de alta un paciente nuevo. El DNI es único (pacientes_dni_key), así
   * que si ya existe se rechaza en vez de duplicarlo o pisarlo en silencio.
   */
  async crear(datos: CrearPacienteDto): Promise<Paciente> {
    const existente = await this.buscarPorDni(datos.dni);
    if (existente) {
      throw new ConflictException(
        `Ya existe un paciente con DNI ${datos.dni} (historia clínica ${existente.historiaClinica})`,
      );
    }

    const historiaClinica = await this.generarHistoriaClinica();
    return this.pacientes.save(
      this.pacientes.create({
        historiaClinica,
        dni: datos.dni,
        nombres: datos.nombres,
        apellidos: datos.apellidos,
        sexo: datos.sexo ?? null,
        celular: datos.celular ?? null,
      }),
    );
  }

  /**
   * Busca al paciente por DNI; si no existe, lo crea. Es lo que usa el
   * registro de citas: "si el DNI ya tiene historia clínica, se reutiliza".
   */
  async buscarOCrear(datos: CrearPacienteDto): Promise<Paciente> {
    const existente = await this.buscarPorDni(datos.dni);
    if (existente) {
      return existente;
    }
    return this.crear(datos);
  }

  /** HC-000001, HC-000002, ... a partir de la secuencia de Postgres. */
  private async generarHistoriaClinica(): Promise<string> {
    const filas = await this.dataSource.query<{ siguiente: number }[]>(
      "SELECT nextval('pacientes_historia_clinica_seq') AS siguiente",
    );
    const siguiente = Number(filas[0].siguiente);
    return `${PREFIJO_HC}${String(siguiente).padStart(DIGITOS_HC, '0')}`;
  }
}
