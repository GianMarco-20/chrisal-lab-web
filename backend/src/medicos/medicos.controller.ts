import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CrearMedicoDto } from './dto/crear-medico.dto';
import { MedicosService } from './medicos.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('recepcion')
@Controller('medicos')
export class MedicosController {
  constructor(private readonly medicos: MedicosService) {}

  @Get()
  listar() {
    return this.medicos.listar();
  }

  @Post()
  crear(@Body() dto: CrearMedicoDto) {
    return this.medicos.crear(dto);
  }
}
