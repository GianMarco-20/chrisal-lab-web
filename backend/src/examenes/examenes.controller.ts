import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ExamenesService } from './examenes.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('recepcion', 'medico', 'laboratorio')
@Controller('examenes-catalogo')
export class ExamenesController {
  constructor(private readonly examenes: ExamenesService) {}

  @Get()
  listar() {
    return this.examenes.listar();
  }
}
