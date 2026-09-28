import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CitasService } from './citas.service';
import { CrearCitaDto } from './dto/crear-cita.dto';

@UseGuards(JwtAuthGuard)
@Controller('citas')
export class CitasController {
  constructor(private readonly citas: CitasService) {}

  @Get()
  listar(@Query('fecha') fecha?: string) {
    return this.citas.listar(fecha);
  }

  @Post()
  crear(@Body() dto: CrearCitaDto) {
    return this.citas.crear(dto);
  }
}
