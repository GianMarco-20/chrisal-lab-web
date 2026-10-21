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
import { ActualizarPerfilDto } from '../auth/dto/actualizar-perfil.dto';
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
  cmp?: string;
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
      .leftJoinAndSelect('u.medico', 'medico')
      .where('u.nombreUsuario = :nombreUsuario', { nombreUsuario })
      .getOne();
  }

  /** Igual que buscarPorId pero con el hash, para verificar la contraseña actual. */
  buscarConHashPorId(id: number): Promise<Usuario | null> {
    return this.usuarios
      .createQueryBuilder('u')
      .addSelect('u.passwordHash')
      .leftJoinAndSelect('u.rol', 'rol')
      .where('u.id = :id', { id })
      .getOne();
  }

  buscarPorId(id: number): Promise<Usuario | null> {
    return this.usuarios.findOne({ where: { id }, relations: { rol: true, medico: true } });
  }

  async registrarLogin(id: number): Promise<void> {
    await this.usuarios.update(id, { ultimoLogin: new Date() });
  }

  listar(): Promise<Usuario[]> {
    return this.usuarios.find({
      relations: { rol: true, medico: true },
      order: { id: 'ASC' },
    });
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

    const passwordHash = await hash(datos.password, COSTO_BCRYPT);
    const guardado = await this.usuarios.save(
      this.usuarios.create({
        nombreUsuario: datos.nombreUsuario,
        passwordHash,
        nombres: datos.nombres,
        apellidos: datos.apellidos,
        dni: datos.dni ?? null,
        rol,
      }),
    );

    // rol = 'medico' crea también su registro en medicos
    if (rol.nombre === 'medico') {
      await this.medicos.save(
        this.medicos.create({
          usuario: guardado,
          especialidad: datos.especialidad ?? 'Medicina General',
          cmp: (datos as any).cmp ?? null,
        }),
      );
    }

    return this.usuarios.findOneByOrFail({ id: guardado.id });
  }

  /** Cambios que una persona hace sobre su propia cuenta (nombre y usuario). */
  async actualizarPerfil(id: number, dto: ActualizarPerfilDto): Promise<Usuario> {
    const usuario = await this.usuarios.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`No existe el usuario ${id}`);
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

    await this.usuarios.save(usuario);
    return this.usuarios.findOneByOrFail({ id });
  }

  async guardarPassword(id: number, passwordNueva: string): Promise<void> {
    await this.usuarios.update(id, { passwordHash: await hash(passwordNueva, COSTO_BCRYPT) });
  }

  async actualizar(
    id: number,
    dto: ActualizarUsuarioDto,
    solicitanteId: number,
  ): Promise<Usuario> {
    const usuario = await this.usuarios.findOne({
      where: { id },
      relations: { rol: true, medico: true },
    });
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
    if (dto.dni !== undefined) usuario.dni = dto.dni;
    if (dto.activo !== undefined) usuario.activo = dto.activo;

    if (dto.rol !== undefined) {
      const rol = await this.roles.findOne({ where: { nombre: dto.rol } });
      if (!rol) {
        throw new BadRequestException(`El rol "${dto.rol}" no existe`);
      }
      if (rol.nombre === 'medico' && !usuario.medico) {
        await this.medicos.save(
          this.medicos.create({
            usuario,
            especialidad: dto.especialidad ?? 'Medicina General',
          }),
        );
      }
      usuario.rol = rol;
    }

    if (dto.password) {
      usuario.passwordHash = await hash(dto.password, COSTO_BCRYPT);
    }

    if (dto.especialidad !== undefined && usuario.medico) {
      await this.medicos.update(usuario.medico.id, { especialidad: dto.especialidad });
    }

    await this.usuarios.save(usuario);
    return this.usuarios.findOneByOrFail({ id });
  }
}
