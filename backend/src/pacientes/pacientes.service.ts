import { ConflictException, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CrearPacienteDto } from './dto/crear-paciente.dto';
import { Paciente } from './paciente.entity';

export interface DatosPersona {
  nombres: string;
  apellidos: string;
}

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

  /**
   * Nombres y apellidos de un documento, para autocompletar el formulario:
   * DNI (8 dígitos) por RENIEC, cualquier otro largo como carnet de extranjería.
   * Las consultas a servicios externos se hacen aquí, no en el navegador, para
   * que los tokens no salgan del servidor.
   */
  consultarDocumento(documento: string): Promise<DatosPersona | null> {
    return documento.length === 8
      ? this.consultarReniec(documento)
      : this.consultarCarnetExtranjeria(documento);
  }

  /** DNI: json.pe primero y, si no responde, Decolecta. */
  async consultarReniec(dni: string): Promise<DatosPersona | null> {
    return (await this.consultarJsonPe('/api/dni', { dni })) ?? (await this.consultarDecolecta(dni));
  }

  async consultarCarnetExtranjeria(carnet: string): Promise<DatosPersona | null> {
    return this.consultarJsonPe('/api/ce', { ce: carnet });
  }

  private async consultarJsonPe(ruta: string, cuerpo: Record<string, string>): Promise<DatosPersona | null> {
    const token = process.env.JSONPE_TOKEN;
    if (!token) {
      console.warn('JSONPE_TOKEN no está configurado.');
      return null;
    }

    try {
      const response = await fetch(`https://api.json.pe${ruta}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(cuerpo),
      });
      if (!response.ok) return null;

      const respuesta = (await response.json()) as Record<string, any>;
      const datos = respuesta.data ?? respuesta;
      const nombres = String(datos.nombres ?? datos.nombre ?? '').trim();
      const apellidos = String(
        datos.apellidos ??
          [datos.apellido_paterno ?? datos.apellidoPaterno, datos.apellido_materno ?? datos.apellidoMaterno]
            .filter(Boolean)
            .join(' '),
      ).trim();
      return nombres || apellidos ? { nombres, apellidos } : null;
    } catch (error) {
      console.warn(`Fallo al consultar json.pe (${ruta}):`, error);
      return null;
    }
  }

  private async consultarDecolecta(dni: string): Promise<DatosPersona | null> {
    const token = process.env.DECOLECTA_API_TOKEN;
    if (!token) {
      console.warn('DECOLECTA_API_TOKEN no está configurado.');
      return null;
    }

    try {
      const response = await fetch(`https://api.decolecta.com/v1/reniec/dni?numero=${dni}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        if (response.status !== 404) {
          console.error(`Error al consultar RENIEC en Decolecta (status ${response.status})`);
        }
        return null;
      }

      const data = await response.json();
      return {
        nombres: data.first_name,
        apellidos: `${data.first_last_name} ${data.second_last_name}`.trim(),
      };
    } catch (error) {
      console.error('Error en consultarDecolecta:', error);
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
