import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcryptjs';
import { Repository } from 'typeorm';
import { Role } from '../roles/role.entity';
import { Usuario } from './usuario.entity';

export interface NuevoUsuario {
  nombreUsuario: string;
  password: string;
  nombres: string;
  apellidos: string;
  rol: string;
}

const COSTO_BCRYPT = 12;

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private readonly usuarios: Repository<Usuario>,
    @InjectRepository(Role) private readonly roles: Repository<Role>,
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

  async crear(datos: NuevoUsuario): Promise<Usuario> {
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
    return this.usuarios.save(
      this.usuarios.create({
        nombreUsuario: datos.nombreUsuario,
        passwordHash,
        nombres: datos.nombres,
        apellidos: datos.apellidos,
        rol,
      }),
    );
  }
}
