import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { RequestConUsuario } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CitasService } from './citas.service';
import { CrearCitaDto } from './dto/crear-cita.dto';
import { ReprogramarCitaDto } from './dto/reprogramar-cita.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('recepcion', 'medico')
@Controller('citas')
export class CitasController {
  constructor(private readonly citas: CitasService) {}

  @Get()
  listar(@Req() request: RequestConUsuario, @Query('fecha') fecha?: string) {
    return this.citas.listar(fecha, request.usuario);
  }

  @Roles('recepcion')
  @Post()
  crear(@Body() dto: CrearCitaDto) {
    return this.citas.crear(dto);
  }

  @Roles('recepcion')
  @Patch(':id/cancelar')
  cancelar(@Param('id', ParseIntPipe) id: number) {
    return this.citas.cancelar(id);
  }

  @Roles('recepcion')
  @Patch(':id/reprogramar')
  reprogramar(@Param('id', ParseIntPipe) id: number, @Body() dto: ReprogramarCitaDto) {
    return this.citas.reprogramar(id, dto);
  }
}
