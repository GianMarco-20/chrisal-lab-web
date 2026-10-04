import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from '../citas/cita.entity';
import { ActualizarDiagnosticoDto } from './dto/actualizar-diagnostico.dto';
import { CrearDiagnosticoDto } from './dto/crear-diagnostico.dto';
import { Diagnostico } from './diagnostico.entity';

@Injectable()
export class DiagnosticosService {
  constructor(
    @InjectRepository(Diagnostico) private readonly diagnosticos: Repository<Diagnostico>,
    @InjectRepository(Cita) private readonly citas: Repository<Cita>,
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

    const diagnostico = this.diagnosticos.create({ cita, diagnostico: dto.diagnostico });
    return this.diagnosticos.save(diagnostico);
  }

  async actualizar(id: number, dto: ActualizarDiagnosticoDto): Promise<Diagnostico> {
    const diagnostico = await this.obtener(id);
    diagnostico.diagnostico = dto.diagnostico;
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
