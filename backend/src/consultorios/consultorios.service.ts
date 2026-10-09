import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consultorio } from './consultorio.entity';

@Injectable()
export class ConsultoriosService {
  constructor(
    @InjectRepository(Consultorio) private readonly consultorios: Repository<Consultorio>,
  ) {}

  listar(): Promise<Consultorio[]> {
    return this.consultorios.find({ order: { id: 'ASC' } });
  }
}
