import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import type { RequestConUsuario } from './jwt-auth.guard';

// Va siempre después de JwtAuthGuard (es quien llena request.usuario).
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestConUsuario>();
    if (!request.usuario?.esAdmin) {
      throw new ForbiddenException('Esta acción requiere el rol de administrador.');
    }
    return true;
  }
}
