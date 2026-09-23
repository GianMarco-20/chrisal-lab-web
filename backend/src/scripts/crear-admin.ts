import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsuariosService } from '../usuarios/usuarios.service';

const MIN_PASSWORD = 8;
const MAX_PASSWORD = 72;

/** Lee una línea de la terminal sin mostrar lo que se escribe. */
function pedirPassword(pregunta: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const stdin = process.stdin;
    if (!stdin.isTTY) {
      reject(new Error('Ejecuta este comando en una terminal interactiva.'));
      return;
    }

    process.stdout.write(pregunta);
    let valor = '';

    const terminar = () => {
      stdin.setRawMode(false);
      stdin.pause();
      stdin.off('data', alRecibir);
      process.stdout.write('\n');
    };

    function alRecibir(texto: string) {
      for (const tecla of texto) {
        if (tecla === '\r' || tecla === '\n') {
          terminar();
          resolve(valor);
          return;
        }
        if (tecla === '\u0003') {
          terminar();
          reject(new Error('Cancelado.'));
          return;
        }
        if (tecla === '\u007f' || tecla === '\b') {
          valor = valor.slice(0, -1);
        } else {
          valor += tecla;
        }
      }
    }

    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data', alRecibir);
  });
}

async function main() {
  const [nombreUsuario, nombres, apellidos] = process.argv.slice(2);
  if (!nombreUsuario || !nombres || !apellidos) {
    console.error(
      'Uso: npm run crear-admin -- <usuario> "<nombres>" "<apellidos>"',
    );
    process.exitCode = 1;
    return;
  }

  const password = await pedirPassword(
    `Contraseña (${MIN_PASSWORD} a ${MAX_PASSWORD} caracteres): `,
  );
  if (password.length < MIN_PASSWORD || password.length > MAX_PASSWORD) {
    console.error(
      `La contraseña debe tener entre ${MIN_PASSWORD} y ${MAX_PASSWORD} caracteres.`,
    );
    process.exitCode = 1;
    return;
  }
  if (password !== (await pedirPassword('Repite la contraseña: '))) {
    console.error('Las contraseñas no coinciden.');
    process.exitCode = 1;
    return;
  }

  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });
  try {
    const usuario = await app.get(UsuariosService).crear({
      nombreUsuario,
      password,
      nombres,
      apellidos,
      rol: 'admin',
    });
    console.log(
      `Usuario "${usuario.nombreUsuario}" creado con rol ${usuario.rol.nombre}.`,
    );
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  } finally {
    await app.close();
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
