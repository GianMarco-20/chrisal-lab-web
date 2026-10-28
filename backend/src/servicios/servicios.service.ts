import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicio } from '../citas/servicio.entity';

@Injectable()
export class ServiciosService {
  constructor(@InjectRepository(Servicio) private readonly servicios: Repository<Servicio>) {}

  /** Servicios del policlínico; `tipo` filtra por 'consultorio' o 'laboratorio'. */
  listar(tipo?: string): Promise<Servicio[]> {
    return this.servicios.find({
      where: tipo ? { tipo } : {},
      order: { nombre: 'ASC' },
    });
  }
}
