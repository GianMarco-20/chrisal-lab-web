import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MedicosService } from './medicos.service';

@UseGuards(JwtAuthGuard)
@Controller('medicos')
export class MedicosController {
  constructor(private readonly medicos: MedicosService) {}

  @Get()
  listar() {
    return this.medicos.listar();
  }
}
