import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medico } from './medico.entity';

@Injectable()
export class MedicosService {
  constructor(@InjectRepository(Medico) private readonly medicos: Repository<Medico>) {}

  // Los médicos se crean desde Gestión de Usuarios (rol "medico"), no aquí.
  listar(): Promise<Medico[]> {
    return this.medicos.find({ order: { id: 'ASC' } });
  }
}
