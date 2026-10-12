import { FindOptionsWhere, ILike, In } from 'typeorm';
import type { JwtPayload } from '../auth/jwt-auth.guard';
import type { UsuariosService } from '../usuarios/usuarios.service';
import type { Cita } from './cita.entity';

// El médico solo ve las citas que ya le tocan a él: con triaje hecho
// (pendiente de diagnóstico) o ya atendidas.
export const ESTADOS_VISIBLES_MEDICO = ['pendiente_diagnostico', 'atendida'];

/**
 * Condición sobre `cita` que limita lo que ve el solicitante. Para admin y
 * demás roles devuelve undefined (sin restricción). Para un médico: citas de
 * su especialidad (servicio con el mismo nombre) en los estados visibles; si
 * no tiene especialidad, una condición que no coincide con nada.
 */
export async function restriccionCitaPorRol(
  usuarios: UsuariosService,
  solicitante?: JwtPayload,
): Promise<FindOptionsWhere<Cita> | undefined> {
  if (!solicitante || solicitante.esAdmin || solicitante.rol !== 'medico') {
    return undefined;
  }

  const usuario = await usuarios.buscarPorId(Number(solicitante.sub));
  const especialidad = usuario?.medico?.especialidad?.trim();
  if (!especialidad) {
    return { id: -1 };
  }
  return {
    servicio: { nombre: ILike(especialidad.replace(/[\%_]/g, '\$&')) },
    estado: { codigo: In(ESTADOS_VISIBLES_MEDICO) },
  };
}
