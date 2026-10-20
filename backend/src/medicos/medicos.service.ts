import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medico } from './medico.entity';

@Injectable()
export class MedicosService {
  constructor(@InjectRepository(Medico) private readonly medicos: Repository<Medico>) {}

  // Los médicos se crean desde Gestión de Usuarios (rol "medico").
  async listar() {
    const list = await this.medicos.find({
      relations: { usuario: true },
      order: { id: 'ASC' },
    });
    return list.map((m) => ({
      id: m.id,
      nombres: m.usuario?.nombres ?? '',
      apellidos: m.usuario?.apellidos ?? '',
      especialidad: m.especialidad,
      cmp: m.cmp,
      dni: m.usuario?.dni ?? null,
      usuarioId: m.usuario?.id,
    }));
  }
}
