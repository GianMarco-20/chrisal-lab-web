import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { UsuariosService } from '../usuarios/usuarios.service';
import { CrearMedicoDto } from './dto/crear-medico.dto';
import { Medico } from './medico.entity';

@Injectable()
export class MedicosService {
  constructor(
    @InjectRepository(Medico) private readonly medicos: Repository<Medico>,
    @InjectRepository(Usuario) private readonly usuarios: Repository<Usuario>,
    private readonly usuariosService: UsuariosService,
  ) {}

  // Los médicos se crean desde Programación Médica (recepción) o desde
  // Gestión de Usuarios (admin, rol "medico").
  async listar() {
    const list = await this.medicos.find({
      relations: { usuario: true },
      order: { id: 'ASC' },
    });
    return list.map((m) => this.aRespuesta(m));
  }

  /**
   * Crea la cuenta del médico (rol médico) y su registro en medicos. El DNI es
   * único: se valida antes para dar un mensaje claro.
   */
  async crear(dto: CrearMedicoDto) {
    if (dto.dni && (await this.usuarios.exists({ where: { dni: dto.dni } }))) {
      throw new ConflictException(`Ya existe un usuario con DNI ${dto.dni}`);
    }

    const usuario = await this.usuariosService.crear({
      nombreUsuario: dto.nombreUsuario,
      password: dto.password,
      nombres: dto.nombres.trim(),
      apellidos: dto.apellidos.trim(),
      dni: dto.dni,
      rol: 'medico',
      especialidad: dto.especialidad.trim(),
    });

    const medico = await this.medicos.findOneOrFail({
      where: { usuario: { id: usuario.id } },
      relations: { usuario: true },
    });
    return this.aRespuesta(medico);
  }

  private aRespuesta(m: Medico) {
    return {
      id: m.id,
      nombres: m.usuario?.nombres ?? '',
      apellidos: m.usuario?.apellidos ?? '',
      especialidad: m.especialidad,
      cmp: m.cmp,
      dni: m.usuario?.dni ?? null,
      usuarioId: m.usuario?.id,
    };
  }
}
