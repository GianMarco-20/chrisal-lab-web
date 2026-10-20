import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { Usuario } from '../usuarios/usuario.entity';
import { UsuariosService } from '../usuarios/usuarios.service';
import { ActualizarPerfilDto } from './dto/actualizar-perfil.dto';
import { CambiarPasswordDto } from './dto/cambiar-password.dto';
import { LoginDto } from './dto/login.dto';
import type { JwtPayload } from './jwt-auth.guard';

// Hash de una contraseña aleatoria. Se compara contra él cuando el usuario no
// existe, para que responder tarde lo mismo y no revele qué usuarios hay.
const HASH_FALSO =
  '$2b$12$bXBoJ3WM2Nb90EscLvdbYeMDnkiLRAhYdTjY6pEFL4NKjvfXFkn9e';

const MENSAJE_CREDENCIALES = 'Usuario o contraseña incorrectos';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarios: UsuariosService,
    private readonly jwt: JwtService,
  ) {}

  async login({ nombreUsuario, password }: LoginDto) {
    const usuario = await this.usuarios.buscarParaLogin(nombreUsuario);
    const passwordValido = await compare(
      password,
      usuario?.passwordHash ?? HASH_FALSO,
    );

    // Mismo mensaje para usuario inexistente, inactivo o contraseña errónea.
    if (!usuario || !usuario.activo || !passwordValido) {
      throw new UnauthorizedException(MENSAJE_CREDENCIALES);
    }

    await this.usuarios.registrarLogin(usuario.id);

    const payload: JwtPayload = {
      sub: String(usuario.id),
      usuario: usuario.nombreUsuario,
      rol: usuario.rol.nombre,
      esAdmin: usuario.rol.esAdmin,
    };

    return {
      accessToken: await this.jwt.signAsync(payload),
      usuario: this.aRespuesta(usuario),
    };
  }

  async perfil(id: number) {
    const usuario = await this.usuarios.buscarPorId(id);
    if (!usuario || !usuario.activo) {
      throw new UnauthorizedException();
    }
    return {
      ...this.aRespuesta(usuario),
      especialidad: usuario.medico?.especialidad ?? null,
      dni: usuario.medico?.dni ?? null,
    };
  }

  async actualizarPerfil(id: number, dto: ActualizarPerfilDto) {
    await this.perfil(id); // rechaza una cuenta desactivada
    const actualizado = await this.usuarios.actualizarPerfil(id, dto);
    return {
      ...this.aRespuesta(actualizado),
      especialidad: actualizado.medico?.especialidad ?? null,
      dni: actualizado.medico?.dni ?? null,
    };
  }

  async cambiarPassword(id: number, { passwordActual, passwordNueva }: CambiarPasswordDto) {
    const usuario = await this.usuarios.buscarConHashPorId(id);
    if (!usuario || !usuario.activo) {
      throw new UnauthorizedException();
    }

    // BadRequest y no Unauthorized: el frontend cierra la sesión ante un 401,
    // y equivocarse al escribir la contraseña actual no debe sacar al usuario.
    if (!(await compare(passwordActual, usuario.passwordHash))) {
      throw new BadRequestException('La contraseña actual es incorrecta.');
    }
    if (passwordActual === passwordNueva) {
      throw new BadRequestException('La contraseña nueva debe ser distinta de la actual.');
    }

    await this.usuarios.guardarPassword(id, passwordNueva);
  }

  private aRespuesta(usuario: Usuario) {
    return {
      id: usuario.id,
      nombreUsuario: usuario.nombreUsuario,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      rol: usuario.rol.nombre,
      esAdmin: usuario.rol.esAdmin,
    };
  }
}
