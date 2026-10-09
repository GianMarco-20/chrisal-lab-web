import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcryptjs';
import { Repository } from 'typeorm';
import { Medico } from '../medicos/medico.entity';
import { Role } from '../roles/role.entity';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { Usuario } from './usuario.entity';

export interface NuevoUsuario {
  nombreUsuario: string;
  password: string;
  nombres: string;
  apellidos: string;
  rol: string;
  // Solo si rol = 'medico'.
  especialidad?: string;
  dni?: string;
}

const COSTO_BCRYPT = 12;

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private readonly usuarios: Repository<Usuario>,
    @InjectRepository(Role) private readonly roles: Repository<Role>,
    @InjectRepository(Medico) private readonly medicos: Repository<Medico>,
  ) {}

  /** Trae el usuario con su hash, que las demás consultas no devuelven. */
  buscarParaLogin(nombreUsuario: string): Promise<Usuario | null> {
    return this.usuarios
      .createQueryBuilder('u')
      .addSelect('u.passwordHash')
      .leftJoinAndSelect('u.rol', 'rol')
      .where('u.nombreUsuario = :nombreUsuario', { nombreUsuario })
      .getOne();
  }

  buscarPorId(id: number): Promise<Usuario | null> {
    return this.usuarios.findOne({ where: { id } });
  }

  async registrarLogin(id: number): Promise<void> {
    await this.usuarios.update(id, { ultimoLogin: new Date() });
  }

  listar(): Promise<Usuario[]> {
    return this.usuarios.find({ order: { id: 'ASC' } });
  }

  async crear(datos: NuevoUsuario | CrearUsuarioDto): Promise<Usuario> {
    const rol = await this.roles.findOne({ where: { nombre: datos.rol } });
    if (!rol) {
      throw new BadRequestException(`El rol "${datos.rol}" no existe`);
    }

    const existe = await this.usuarios.exists({
      where: { nombreUsuario: datos.nombreUsuario },
    });
    if (existe) {
      throw new ConflictException(
        `El usuario "${datos.nombreUsuario}" ya existe`,
      );
    }

    // rol = 'medico' crea también su ficha en medicos, para que Programación
    // Médica pueda asignarle consultorio/turnos.
    let medicoId: number | null = null;
    if (rol.nombre === 'medico') {
      const medico = await this.medicos.save(
        this.medicos.create({
          nombres: datos.nombres,
          apellidos: datos.apellidos,
          especialidad: datos.especialidad ?? null,
          dni: datos.dni ?? null,
        }),
      );
      medicoId = medico.id;
    }

    const passwordHash = await hash(datos.password, COSTO_BCRYPT);
    const guardado = await this.usuarios.save(
      this.usuarios.create({
        nombreUsuario: datos.nombreUsuario,
        passwordHash,
        nombres: datos.nombres,
        apellidos: datos.apellidos,
        rol,
        medicoId,
      }),
    );
    // Se vuelve a leer: passwordHash tiene select:false, así que esta
    // consulta no lo trae (guardado sí lo tiene, porque se acaba de asignar
    // en memoria) y de paso llega con la relación medico ya cargada.
    return this.usuarios.findOneByOrFail({ id: guardado.id });
  }

  async actualizar(
    id: number,
    dto: ActualizarUsuarioDto,
    solicitanteId: number,
  ): Promise<Usuario> {
    const usuario = await this.usuarios.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`No existe el usuario ${id}`);
    }

    if (dto.activo === false && id === solicitanteId) {
      throw new BadRequestException('No puedes desactivar tu propia cuenta.');
    }

    if (dto.nombreUsuario !== undefined && dto.nombreUsuario !== usuario.nombreUsuario) {
      const enUso = await this.usuarios.exists({ where: { nombreUsuario: dto.nombreUsuario } });
      if (enUso) {
        throw new ConflictException(`El usuario "${dto.nombreUsuario}" ya existe`);
      }
      usuario.nombreUsuario = dto.nombreUsuario;
    }
    if (dto.nombres !== undefined) usuario.nombres = dto.nombres;
    if (dto.apellidos !== undefined) usuario.apellidos = dto.apellidos;
    if (dto.activo !== undefined) usuario.activo = dto.activo;

    if (dto.rol !== undefined) {
      const rol = await this.roles.findOne({ where: { nombre: dto.rol } });
      if (!rol) {
        throw new BadRequestException(`El rol "${dto.rol}" no existe`);
      }
      if (rol.nombre === 'medico' && !usuario.medicoId) {
        throw new BadRequestException(
          'Para asignar el rol médico crea un usuario nuevo con ese rol: necesita especialidad y DNI.',
        );
      }
      usuario.rol = rol;
    }

    if (dto.password) {
      usuario.passwordHash = await hash(dto.password, COSTO_BCRYPT);
    }

    if (dto.especialidad !== undefined && usuario.medicoId) {
      await this.medicos.update(usuario.medicoId, { especialidad: dto.especialidad });
    }

    await this.usuarios.save(usuario);
    return this.usuarios.findOneByOrFail({ id });
  }
}
