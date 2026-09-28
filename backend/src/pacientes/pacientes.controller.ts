import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PacientesService } from './pacientes.service';

@UseGuards(JwtAuthGuard)
@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientes: PacientesService) {}

  /**
   * Para autocompletar el formulario de "Registrar Nueva Cita": al escribir
   * el DNI, el frontend consulta aquí si ya existe la historia clínica.
   */
  @Get(':dni')
  async buscarPorDni(@Param('dni') dni: string) {
    const paciente = await this.pacientes.buscarPorDni(dni);
    if (!paciente) {
      throw new NotFoundException('No existe un paciente con ese DNI');
    }
    return paciente;
  }
}
