import { Controller, Get, NotFoundException, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { PacientesService } from './pacientes.service';

@UseGuards(JwtAuthGuard, RolesGuard)
// Recepción (citas) y laboratorio (nueva orden) buscan pacientes por DNI o Carnet de Extranjería.
@Roles('recepcion', 'laboratorio')
@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientes: PacientesService) {}

  /**
   * Para autocompletar el formulario de citas y laboratorio: al escribir
   * el documento, busca primero en la base local y luego en RENIEC / CE externo.
   */
  @Get(':dni')
  async buscarPorDni(@Param('dni') dni: string, @Query('tipo') tipo?: string) {
    // 1. Buscar primero en la base local (funciona para DNI o Carnet de Extranjería)
    const pacienteLocal = await this.pacientes.buscarPorDni(dni);

    if (pacienteLocal) {
      return pacienteLocal;
    }

    // 2. Si es Carnet de Extranjería
    if (tipo === 'ce') {
      const datosCe = await this.pacientes.consultarCe(dni);
      if (!datosCe) {
        throw new NotFoundException('No existe un paciente con ese Carnet de Extranjería');
      }
      return {
        historiaClinica: null,
        dni,
        nombres: datosCe.nombres,
        apellidos: datosCe.apellidos,
        sexo: null,
        celular: null,
        edad: null,
      };
    }

    // 3. No está en la base: consultar RENIEC (DNI)
    const datosReniec = await this.pacientes.consultarReniec(dni);

    if (!datosReniec) {
      throw new NotFoundException('No existe un paciente con ese DNI');
    }

    // 4. Encontrado en RENIEC, pero AÚN no tiene historia clínica
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