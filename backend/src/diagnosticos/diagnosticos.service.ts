import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CitaExamenesService } from '../cita-examenes/cita-examenes.service';
import { Cita } from '../citas/cita.entity';
import { EstadoCita } from '../citas/estado-cita.entity';
import { ActualizarDiagnosticoDto } from './dto/actualizar-diagnostico.dto';
import { CrearDiagnosticoDto } from './dto/crear-diagnostico.dto';
import { Diagnostico } from './diagnostico.entity';

// Al guardar el diagnóstico, la cita llega al final del flujo (ver
// estados_cita, migración 004): ya fue atendida.
const ESTADO_SIGUIENTE = 'atendida';

@Injectable()
export class DiagnosticosService {
  constructor(
    @InjectRepository(Diagnostico) private readonly diagnosticos: Repository<Diagnostico>,
    @InjectRepository(Cita) private readonly citas: Repository<Cita>,
    @InjectRepository(EstadoCita) private readonly estados: Repository<EstadoCita>,
    private readonly citaExamenes: CitaExamenesService,
  ) {}

  listar(citaId?: number): Promise<Diagnostico[]> {
    return this.diagnosticos.find({
      where: citaId ? { cita: { id: citaId } } : {},
      order: { fechaRegistro: 'DESC' },
    });
  }

  async obtener(id: number): Promise<Diagnostico> {
    const diagnostico = await this.diagnosticos.findOneBy({ id });
    if (!diagnostico) {
      throw new NotFoundException(`No existe el diagnóstico ${id}`);
    }
    return diagnostico;
  }

  async crear(dto: CrearDiagnosticoDto): Promise<Diagnostico> {
    const cita = await this.buscarCita(dto.citaId);

    const yaExiste = await this.diagnosticos.findOne({ where: { cita: { id: dto.citaId } } });
    if (yaExiste) {
      throw new ConflictException(`La cita ${dto.citaId} ya tiene un diagnóstico registrado.`);
    }

    const diagnostico = this.diagnosticos.create({
      cita,
      sintomas: dto.sintomas ?? null,
      diagnostico: dto.diagnostico,
      indicaciones: dto.indicaciones ?? null,
    });
    const guardado = await this.diagnosticos.save(diagnostico);

    const estadoSiguiente = await this.estados.findOneByOrFail({ codigo: ESTADO_SIGUIENTE });
    await this.citas.save({ id: cita.id, estado: estadoSiguiente });

    for (const examenId of dto.examenIds ?? []) {
      await this.citaExamenes.crear({ citaId: dto.citaId, examenId });
    }

    return guardado;
  }

  async actualizar(id: number, dto: ActualizarDiagnosticoDto): Promise<Diagnostico> {
    const diagnostico = await this.obtener(id);
    if (dto.sintomas !== undefined) diagnostico.sintomas = dto.sintomas;
    diagnostico.diagnostico = dto.diagnostico;
    if (dto.indicaciones !== undefined) diagnostico.indicaciones = dto.indicaciones;
    return this.diagnosticos.save(diagnostico);
  }

  async eliminar(id: number): Promise<void> {
    await this.obtener(id);
    await this.diagnosticos.delete(id);
  }

  private async buscarCita(citaId: number): Promise<Cita> {
    const cita = await this.citas.findOneBy({ id: citaId });
    if (!cita) {
      throw new BadRequestException(`No existe la cita ${citaId}.`);
    }
    return cita;
  }
}
