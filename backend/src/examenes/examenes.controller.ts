import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ActualizarPaqueteLaboratorioDto } from './dto/actualizar-paquete-laboratorio.dto';
import { ActualizarDetalleExamenDto } from './dto/actualizar-detalle-examen.dto';
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

  @Get('paquetes')
  listarPaquetes() {
    return this.examenes.listarPaquetes();
  }

  @Roles('recepcion', 'laboratorio')
  @Patch('paquetes/:id')
  actualizarPaquete(@Param('id') id: string, @Body() dto: ActualizarPaqueteLaboratorioDto) {
    return this.examenes.actualizarPaquete(id, dto);
  }

  // Precios, tubo, muestra, condición y entrega: solo recepción y laboratorio
  // (el administrador entra siempre). El médico solo consulta el catálogo.
  @Roles('recepcion', 'laboratorio')
  @Patch(':id/detalle')
  actualizarDetalle(@Param('id') id: string, @Body() dto: ActualizarDetalleExamenDto) {
    return this.examenes.actualizarDetalle(id, dto);
  }
}
