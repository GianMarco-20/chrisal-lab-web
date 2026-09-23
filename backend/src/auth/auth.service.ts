import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { Usuario } from '../usuarios/usuario.entity';
import { UsuariosService } from '../usuarios/usuarios.service';
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
    return this.aRespuesta(usuario);
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
