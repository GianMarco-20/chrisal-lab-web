import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hashSync } from 'bcryptjs';
import { Usuario } from '../usuarios/usuario.entity';
import { UsuariosService } from '../usuarios/usuarios.service';
import { AuthService } from './auth.service';

const PASSWORD = 'clave-segura-123';

function crearUsuario(cambios: Partial<Usuario> = {}): Usuario {
  return {
    id: 7,
    nombreUsuario: 'angela',
    passwordHash: hashSync(PASSWORD, 4),
    nombres: 'Angela',
    apellidos: 'Quispe',
    rol: { id: 1, nombre: 'admin', esAdmin: true },
    medicoId: null,
    activo: true,
    fechaCreacion: new Date(),
    ultimoLogin: null,
    ...cambios,
  };
}

describe('AuthService', () => {
  let auth: AuthService;
  let usuarios: jest.Mocked<
    Pick<UsuariosService, 'buscarParaLogin' | 'buscarPorId' | 'registrarLogin'>
  >;
  let jwt: JwtService;

  beforeEach(() => {
    usuarios = {
      buscarParaLogin: jest.fn(),
      buscarPorId: jest.fn(),
      registrarLogin: jest.fn().mockResolvedValue(undefined),
    };
    jwt = new JwtService({ secret: 'secreto-de-prueba' });
    auth = new AuthService(usuarios as unknown as UsuariosService, jwt);
  });

  it('devuelve un token y los datos del usuario con credenciales correctas', async () => {
    usuarios.buscarParaLogin.mockResolvedValue(crearUsuario());

    const resultado = await auth.login({
      nombreUsuario: 'angela',
      password: PASSWORD,
    });

    const payload = await jwt.verifyAsync<{ sub: string; esAdmin: boolean }>(
      resultado.accessToken,
    );
    expect(payload.sub).toBe('7');
    expect(payload.esAdmin).toBe(true);
    expect(resultado.usuario).toEqual({
      id: 7,
      nombreUsuario: 'angela',
      nombres: 'Angela',
      apellidos: 'Quispe',
      rol: 'admin',
      esAdmin: true,
    });
    expect(resultado.usuario).not.toHaveProperty('passwordHash');
    expect(usuarios.registrarLogin).toHaveBeenCalledWith(7);
  });

  it('rechaza una contraseña incorrecta', async () => {
    usuarios.buscarParaLogin.mockResolvedValue(crearUsuario());

    await expect(
      auth.login({ nombreUsuario: 'angela', password: 'otra-clave' }),
    ).rejects.toThrow(UnauthorizedException);
    expect(usuarios.registrarLogin).not.toHaveBeenCalled();
  });

  it('rechaza un usuario que no existe con el mismo mensaje', async () => {
    usuarios.buscarParaLogin.mockResolvedValue(null);

    await expect(
      auth.login({ nombreUsuario: 'nadie', password: PASSWORD }),
    ).rejects.toThrow('Usuario o contraseña incorrectos');
  });

  it('rechaza un usuario inactivo aunque la contraseña sea correcta', async () => {
    usuarios.buscarParaLogin.mockResolvedValue(
      crearUsuario({ activo: false }),
    );

    await expect(
      auth.login({ nombreUsuario: 'angela', password: PASSWORD }),
    ).rejects.toThrow(UnauthorizedException);
    expect(usuarios.registrarLogin).not.toHaveBeenCalled();
  });

  it('perfil rechaza un usuario que fue desactivado', async () => {
    usuarios.buscarPorId.mockResolvedValue(crearUsuario({ activo: false }));

    await expect(auth.perfil(7)).rejects.toThrow(UnauthorizedException);
  });
});
