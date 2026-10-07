import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamenCatalogo } from './examen-catalogo.entity';

@Injectable()
export class ExamenesService {
  constructor(
    @InjectRepository(ExamenCatalogo) private readonly examenes: Repository<ExamenCatalogo>,
  ) {}

  // Catálogo completo (198 exámenes, ver seed 004); el frontend los agrupa
  // por categoria.nombre para el selector de orden de laboratorio.
  listar(): Promise<ExamenCatalogo[]> {
    return this.examenes.find({
      order: { categoria: { id: 'ASC' }, nombre: 'ASC' },
    });
  }
}
