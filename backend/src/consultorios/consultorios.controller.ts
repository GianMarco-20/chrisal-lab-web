import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ConsultoriosService } from './consultorios.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('recepcion')
@Controller('consultorios')
export class ConsultoriosController {
  constructor(private readonly consultorios: ConsultoriosService) {}

  @Get()
  listar() {
    return this.consultorios.listar();
  }
}
