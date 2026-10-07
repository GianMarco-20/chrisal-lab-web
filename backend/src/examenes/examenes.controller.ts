import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ExamenesService } from './examenes.service';

@UseGuards(JwtAuthGuard)
@Controller('examenes-catalogo')
export class ExamenesController {
  constructor(private readonly examenes: ExamenesService) {}

  @Get()
  listar() {
    return this.examenes.listar();
  }
}
