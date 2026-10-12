import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
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
}
