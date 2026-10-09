import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ConsultoriosService } from './consultorios.service';

@UseGuards(JwtAuthGuard)
@Controller('consultorios')
export class ConsultoriosController {
  constructor(private readonly consultorios: ConsultoriosService) {}

  @Get()
  listar() {
    return this.consultorios.listar();
  }
}
