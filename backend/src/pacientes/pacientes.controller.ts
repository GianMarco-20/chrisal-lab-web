import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { PacientesService } from './pacientes.service';

@UseGuards(JwtAuthGuard, RolesGuard)
// Recepción (citas) y laboratorio (nueva orden) buscan pacientes por DNI.
@Roles('recepcion', 'laboratorio')
@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientes: PacientesService) {}

  /**
   * Para autocompletar el formulario de "Registrar Nueva Cita": al escribir
   * el DNI, el frontend consulta aquí si ya existe la historia clínica.
   */
  @Get(':dni')
  async buscarPorDni(@Param('dni') dni: string) {
    // 1. Buscar primero en la base local
    const pacienteLocal = await this.pacientes.buscarPorDni(dni);

    if (pacienteLocal) {
      return pacienteLocal;
    }

    // 2. No está en la base: consultar RENIEC (DNI) o json.pe (carnet de extranjería)
    const datosReniec = await this.pacientes.consultarDocumento(dni);

    if (!datosReniec) {
      throw new NotFoundException('No existe un paciente con ese documento');
    }

    // 3. Encontrado en el servicio externo, pero AÚN no tiene historia clínica
    return {
      historiaClinica: null,
      dni,
      nombres: datosReniec.nombres,
      apellidos: datosReniec.apellidos,
      sexo: null,
      celular: null,
      edad: null,
    };
  }
}
