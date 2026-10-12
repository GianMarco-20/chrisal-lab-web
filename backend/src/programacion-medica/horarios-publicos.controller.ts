import { Controller, Get } from '@nestjs/common';
import { ProgramacionMedicaService } from './programacion-medica.service';

// Sin JwtAuthGuard a propósito: lo consume la web pública (frontend-web).
// Solo devuelve lo que ya es público (ver HorarioPublico), nunca DNI ni ids.
@Controller('publico/horarios-medicos')
export class HorariosPublicosController {
  constructor(private readonly programaciones: ProgramacionMedicaService) {}

  @Get()
  listar() {
    return this.programaciones.listarPublico();
  }
}
