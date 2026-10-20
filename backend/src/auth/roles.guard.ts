import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { RequestConUsuario } from './jwt-auth.guard';
import { ROLES_KEY } from './roles.decorator';

// Va siempre después de JwtAuthGuard (es quien llena request.usuario).
// Sin @Roles() en la ruta ni en el controlador, basta con estar autenticado.
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permitidos = this.reflector.getAllAndOverride<string[] | undefined>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!permitidos) {
      return true;
    }

    const usuario = context.switchToHttp().getRequest<RequestConUsuario>().usuario;
    if (usuario?.esAdmin || (usuario && permitidos.includes(usuario.rol))) {
      return true;
    }
    throw new ForbiddenException('Tu rol no tiene acceso a este recurso.');
  }
}
