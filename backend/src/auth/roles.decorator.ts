import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

// Roles (columna roles.nombre) que pueden usar la ruta. El administrador
// siempre pasa, no hace falta listarlo.
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
