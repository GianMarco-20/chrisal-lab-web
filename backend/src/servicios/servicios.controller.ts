import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ServiciosService } from './servicios.service';

// Las especialidades de los médicos son los servicios de tipo "consultorio".
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('recepcion')
@Controller('servicios')
export class ServiciosController {
  constructor(private readonly servicios: ServiciosService) {}

  @Get()
  listar(@Query('tipo') tipo?: string) {
    return this.servicios.listar(tipo);
  }
}
