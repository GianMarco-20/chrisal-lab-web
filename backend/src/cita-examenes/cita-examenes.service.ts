import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from '../citas/cita.entity';
import { ExamenCatalogo } from '../examenes/examen-catalogo.entity';
import { CitaExamen } from './cita-examen.entity';
import { CrearCitaExamenDto } from './dto/crear-cita-examen.dto';

@Injectable()
export class CitaExamenesService {
  constructor(
    @InjectRepository(CitaExamen) private readonly citaExamenes: Repository<CitaExamen>,
    @InjectRepository(Cita) private readonly citas: Repository<Cita>,
    @InjectRepository(ExamenCatalogo) private readonly examenes: Repository<ExamenCatalogo>,
  ) {}

  listar(citaId?: number): Promise<CitaExamen[]> {
    return this.citaExamenes.find({
      where: citaId ? { cita: { id: citaId } } : {},
      order: { id: 'ASC' },
    });
  }

  async crear(dto: CrearCitaExamenDto): Promise<CitaExamen> {
    const cita = await this.citas.findOneBy({ id: dto.citaId });
    if (!cita) {
      throw new BadRequestException(`No existe la cita ${dto.citaId}.`);
    }
    const examen = await this.examenes.findOneBy({ id: dto.examenId });
    if (!examen) {
      throw new BadRequestException(`No existe el examen ${dto.examenId} en el catálogo.`);
    }

    const yaExiste = await this.citaExamenes.findOne({
      where: { cita: { id: dto.citaId }, examen: { id: dto.examenId } },
    });
    if (yaExiste) {
      throw new ConflictException(
        `La cita ${dto.citaId} ya tiene ordenado el examen "${examen.nombre}".`,
      );
    }

    return this.citaExamenes.save(this.citaExamenes.create({ cita, examen }));
  }

  async eliminar(id: number): Promise<void> {
    const existe = await this.citaExamenes.findOneBy({ id });
    if (!existe) {
      throw new NotFoundException(`No existe la orden de examen ${id}`);
    }
    await this.citaExamenes.delete(id);
  }
}
