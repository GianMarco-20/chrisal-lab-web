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
    // 1. Buscar primero en la base local
    const pacienteLocal = await this.pacientes.buscarPorDni(dni);

    if (pacienteLocal) {
      return pacienteLocal;
    }

    // 2. No está en la base: consultar RENIEC
    const datosReniec = await this.pacientes.consultarReniec(dni);

    if (!datosReniec) {
      throw new NotFoundException('No existe un paciente con ese DNI');
    }

    // 3. Encontrado en RENIEC, pero AÚN no tiene historia clínica
    return {
      historiaClinica: null,
      dni,
      nombres: datosReniec.nombres,
      apellidos: datosReniec.apellidos,
      sexo: null,
      celular: null,
    };
  }
}
