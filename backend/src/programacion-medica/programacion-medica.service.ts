import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consultorio } from '../consultorios/consultorio.entity';
import { Medico } from '../medicos/medico.entity';
import { ActualizarProgramacionMedicaDto } from './dto/actualizar-programacion-medica.dto';
import { CrearProgramacionMedicaDto } from './dto/crear-programacion-medica.dto';
import { ProgramacionMedica } from './programacion-medica.entity';

@Injectable()
export class ProgramacionMedicaService {
  constructor(
    @InjectRepository(ProgramacionMedica)
    private readonly programaciones: Repository<ProgramacionMedica>,
    @InjectRepository(Medico) private readonly medicos: Repository<Medico>,
    @InjectRepository(Consultorio)
    private readonly consultorios: Repository<Consultorio>,
  ) {}

  listar(fecha?: string): Promise<ProgramacionMedica[]> {
    return this.programaciones.find({
      where: fecha ? { fecha } : {},
      order: { fecha: 'ASC', horaInicio: 'ASC' },
    });
  }

  async obtener(id: number): Promise<ProgramacionMedica> {
    const programacion = await this.programaciones.findOneBy({ id });
    if (!programacion) {
      throw new NotFoundException(`No existe la programación ${id}`);
    }
    return programacion;
  }

  async crear(dto: CrearProgramacionMedicaDto): Promise<ProgramacionMedica> {
    this.validarHorario(dto.horaInicio, dto.horaFin);
    const medico = await this.buscarMedico(dto.medicoId);
    const consultorio = await this.buscarConsultorio(dto.consultorioId);

    const programacion = this.programaciones.create({
      medico,
      consultorio,
      fecha: dto.fecha,
      turno: dto.turno,
      horaInicio: dto.horaInicio,
      horaFin: dto.horaFin,
    });
    return this.programaciones.save(programacion);
  }

  async actualizar(
    id: number,
    dto: ActualizarProgramacionMedicaDto,
  ): Promise<ProgramacionMedica> {
    const programacion = await this.obtener(id);

    this.validarHorario(
      dto.horaInicio ?? programacion.horaInicio,
      dto.horaFin ?? programacion.horaFin,
    );

    if (dto.medicoId !== undefined) {
      programacion.medico = await this.buscarMedico(dto.medicoId);
    }
    if (dto.consultorioId !== undefined) {
      programacion.consultorio = await this.buscarConsultorio(dto.consultorioId);
    }
    if (dto.fecha !== undefined) programacion.fecha = dto.fecha;
    if (dto.turno !== undefined) programacion.turno = dto.turno;
    if (dto.horaInicio !== undefined) programacion.horaInicio = dto.horaInicio;
    if (dto.horaFin !== undefined) programacion.horaFin = dto.horaFin;

    return this.programaciones.save(programacion);
  }

  async eliminar(id: number): Promise<void> {
    await this.obtener(id);
    try {
      await this.programaciones.delete(id);
    } catch (error) {
      // citas.programacion_id referencia esta tabla sin ON DELETE CASCADE:
      // Postgres rechaza el borrado si alguna cita ya quedó asignada a ella.
      if (esViolacionDeLlaveForanea(error)) {
        throw new BadRequestException(
          'No se puede eliminar: hay citas asignadas a esta programación.',
        );
      }
      throw error;
    }
  }

  private validarHorario(horaInicio: string, horaFin: string): void {
    if (horaFin <= horaInicio) {
      throw new BadRequestException('La hora de fin debe ser posterior a la hora de inicio.');
    }
  }

  private async buscarMedico(medicoId: number): Promise<Medico> {
    const medico = await this.medicos.findOneBy({ id: medicoId });
    if (!medico) {
      throw new BadRequestException(`No existe el médico ${medicoId}.`);
    }
    return medico;
  }

  private async buscarConsultorio(consultorioId: number): Promise<Consultorio> {
    const consultorio = await this.consultorios.findOneBy({ id: consultorioId });
    if (!consultorio) {
      throw new BadRequestException(`No existe el consultorio ${consultorioId}.`);
    }
    return consultorio;
  }
}

function esViolacionDeLlaveForanea(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code?: string }).code === '23503'
  );
}
