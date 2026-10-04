import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from '../pacientes/paciente.entity';
import { PacientesService } from '../pacientes/pacientes.service';
import { Cita } from './cita.entity';
import { Cuenta } from './cuenta.entity';
import { CrearCitaDto } from './dto/crear-cita.dto';
import { EstadoCita } from './estado-cita.entity';
import { Servicio } from './servicio.entity';

const DURACION_CITA_MINUTOS = 30;
// Toda cita nueva arranca pidiendo triaje; de ahí pasa a diagnóstico,
// atendida, o ausente si el paciente no llega.
const ESTADO_INICIAL = 'pendiente_triaje';

@Injectable()
export class CitasService {
  constructor(
    @InjectRepository(Cita) private readonly citas: Repository<Cita>,
    @InjectRepository(Cuenta) private readonly cuentas: Repository<Cuenta>,
    @InjectRepository(Servicio) private readonly servicios: Repository<Servicio>,
    @InjectRepository(EstadoCita) private readonly estados: Repository<EstadoCita>,
    private readonly pacientesService: PacientesService,
  ) {}

  listar(fecha?: string): Promise<Cita[]> {
    return this.citas.find({
      where: fecha ? { fechaCita: fecha } : {},
      order: { fechaCita: 'ASC', horaInicio: 'ASC' },
    });
  }

  /**
   * Registra una cita nueva:
   * 1. Si el DNI ya tiene historia clínica, la reutiliza; si no, la crea.
   * 2. Reutiliza la cuenta más reciente del paciente, o abre una si no tiene.
   * 3. Resuelve el servicio por nombre (debe existir ya en `servicios`).
   * 4. Calcula hora_fin como hora_inicio + 30 minutos (bloques fijos).
   */
  async crear(dto: CrearCitaDto): Promise<Cita> {
    const paciente = await this.pacientesService.buscarOCrear(dto.paciente);
    const cuenta = await this.obtenerOAbrirCuenta(paciente);
    const servicio = await this.buscarServicio(dto.especialidad);
    const estado = await this.estados.findOneByOrFail({ codigo: ESTADO_INICIAL });

    const cita = this.citas.create({
      cuenta,
      servicio,
      fechaCita: dto.fecha,
      horaInicio: dto.hora,
      horaFin: sumarMinutos(dto.hora, DURACION_CITA_MINUTOS),
      programacionId: null,
      estado,
    });
    return this.citas.save(cita);
  }

  private async obtenerOAbrirCuenta(paciente: Paciente): Promise<Cuenta> {
    const cuentaExistente = await this.cuentas.findOne({
      where: { paciente: { historiaClinica: paciente.historiaClinica } },
      order: { fechaApertura: 'DESC' },
    });
    if (cuentaExistente) {
      return cuentaExistente;
    }
    // Se guarda el paciente completo (no solo su historiaClinica): la relación
    // eager de Cuenta.paciente devuelve exactamente lo que se le pasa aquí al
    // guardar, sin volver a consultarlo, así que un objeto parcial dejaría
    // dni/nombres/apellidos como undefined en la respuesta de esta misma petición.
    return this.cuentas.save(this.cuentas.create({ paciente }));
  }

  private async buscarServicio(nombre: string): Promise<Servicio> {
    const servicio = await this.servicios
      .createQueryBuilder('s')
      .where('LOWER(s.nombre) = LOWER(:nombre)', { nombre: nombre.trim() })
      .getOne();
    if (!servicio) {
      throw new BadRequestException(
        `El servicio "${nombre}" no existe. Debe crearse antes en la tabla servicios.`,
      );
    }
    return servicio;
  }
}

/** Suma minutos a una hora "HH:mm" y devuelve "HH:mm:ss" para la columna time. */
function sumarMinutos(hora: string, minutos: number): string {
  const [horas, mins] = hora.split(':').map(Number);
  const totalMin = (horas * 60 + mins + minutos) % (24 * 60);
  const hh = String(Math.floor(totalMin / 60)).padStart(2, '0');
  const mm = String(totalMin % 60).padStart(2, '0');
  return `${hh}:${mm}:00`;
}
