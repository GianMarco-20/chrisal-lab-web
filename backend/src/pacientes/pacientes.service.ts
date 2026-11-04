import { ConflictException, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CrearPacienteDto } from './dto/crear-paciente.dto';
import { Paciente } from './paciente.entity';

const PREFIJO_HC = 'HC-';
const DIGITOS_HC = 6;
const JSONPE_TOKEN = process.env.JSONPE_TOKEN || 'fc30926bd39c567c15a6d1417a19f61f7cec33b398b8ae0439517d61747e';

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
    const jsonPeToken = process.env.JSONPE_TOKEN || 'fc30926bd39c567c15a6d1417a19f61f7cec33b398b8ae0439517d61747e';

    // 1. Intentar con json.pe
    try {
      const resJsonPe = await fetch('https://api.json.pe/api/dni', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jsonPeToken}`,
        },
        body: JSON.stringify({ dni }),
      });

      if (resJsonPe.ok) {
        const resp = (await resJsonPe.json()) as any;
        const data = resp.data ?? resp;
        const nombres = (data.nombres ?? data.nombre ?? '') as string;
        const apellidos = (
          data.apellidos ??
          [data.apellido_paterno, data.apellido_materno].filter(Boolean).join(' ')
        ) as string;

        if (nombres || apellidos) {
          return {
            nombres: nombres.trim(),
            apellidos: apellidos.trim(),
          };
        }
      }
    } catch (e) {
      console.warn('json.pe fallÃ³, intentando fallback de decolecta:', e);
    }

    // 2. Fallback a decolecta
    // 1. Intentar primero con la API de json.pe (DNI)
    try {
      const resJsonPe = await fetch('https://api.json.pe/api/dni', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSONPE_TOKEN}`,
        },
        body: JSON.stringify({ dni }),
      });

      if (resJsonPe.ok) {
        const resp = (await resJsonPe.json()) as any;
        const data = resp.data ?? resp;
        const nombres = data.nombres ?? data.nombre ?? '';
        const apellidos =
          data.apellidos ??
          [data.apellido_paterno, data.apellido_materno].filter(Boolean).join(' ');

        if (nombres || apellidos) {
          return {
            nombres: nombres.trim(),
            apellidos: apellidos.trim(),
          };
        }
      }
    } catch (e) {
      console.warn('Fallo al consultar DNI en json.pe, intentando decolecta como fallback:', e);
    }

    // 2. Fallback a decolecta
    const url = `https://api.decolecta.com/v1/reniec/dni?numero=${dni}`;
    const token = process.env.DECOLECTA_API_TOKEN;

    if (!token) {
      return null;
    }

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return {
        nombres: data.first_name,
        apellidos: `${data.first_last_name} ${data.second_last_name}`.trim(),
      };
    } catch (error) {
      console.error('Error en consultarReniec decolecta fallback:', error);
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
        edad: datos.edad,
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
      // La edad cambia con el tiempo y los pacientes antiguos no la tienen:
      // cada cita la vuelve a pedir y se actualiza si es distinta.
      if (existente.edad !== datos.edad) {
        existente.edad = datos.edad;
        return this.pacientes.save(existente);
      }
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
