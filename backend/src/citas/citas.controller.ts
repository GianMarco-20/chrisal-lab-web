import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CitasService } from './citas.service';
import { CrearCitaDto } from './dto/crear-cita.dto';
import { ReprogramarCitaDto } from './dto/reprogramar-cita.dto';

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

  @Patch(':id/cancelar')
  cancelar(@Param('id', ParseIntPipe) id: number) {
    return this.citas.cancelar(id);
  }

  @Patch(':id/reprogramar')
  reprogramar(@Param('id', ParseIntPipe) id: number, @Body() dto: ReprogramarCitaDto) {
    return this.citas.reprogramar(id, dto);
  }
}
