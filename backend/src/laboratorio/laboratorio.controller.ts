import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { JwtPayload } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import {
  AnularOrdenDto,
  CrearOrdenLaboratorioDto,
  RegistrarResultadoDto,
} from './dto/laboratorio.dto';
import { LaboratorioService } from './laboratorio.service';

type RequestConUsuario = Request & { usuario?: JwtPayload };

// Órdenes de laboratorio: recepción y laboratorio (el admin pasa siempre).
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('recepcion', 'laboratorio')
@Controller('laboratorio')
export class LaboratorioController {
  constructor(private readonly lab: LaboratorioService) {}

  /** GET /laboratorio/estados — lista los estados disponibles de laboratorio */
  @Get('estados')
  listarEstados() {
    return this.lab.listarEstados();
  }

  /** GET /laboratorio/categorias — árbol de categorías y exámenes para el formulario */
  @Get('categorias')
  listarCategorias() {
    return this.lab.listarCategorias();
  }

  /**
   * GET /laboratorio
   * Parámetros opcionales: ?estado=En análisis&fecha=2024-01-15&busqueda=juan
   */
  @Get()
  listar(
    @Query('estado') estado?: string,
    @Query('fecha') fecha?: string,
    @Query('busqueda') busqueda?: string,
  ) {
    return this.lab.listar({ estado, fecha, busqueda });
  }

  /** GET /laboratorio/:id — detalle de la orden con todos sus exámenes */
  @Get(':id')
  detalle(@Param('id', ParseIntPipe) id: number) {
    return this.lab.detalle(id);
  }

  /**
   * POST /laboratorio — crear nueva orden (toma de muestra)
   * Requiere: paciente (dni, nombres, apellidos) y examenesIds[]
   * Usuario de la sesión se toma del JWT automáticamente.
   */
  @Post()
  crear(
    @Body() dto: CrearOrdenLaboratorioDto,
    @Req() req: RequestConUsuario,
  ) {
    return this.lab.crear(dto, req.usuario!);
  }

  /**
   * POST /laboratorio/examenes/:ordenExamenId/resultado
   * Registra o edita el resultado de un examen específico.
   * Nota: esta ruta va ANTES de /:id para que NestJS no confunda 'examenes' con un id.
   */
  @Post('examenes/:ordenExamenId/resultado')
  registrarResultado(
    @Param('ordenExamenId', ParseIntPipe) ordenExamenId: number,
    @Body() dto: RegistrarResultadoDto,
    @Req() req: RequestConUsuario,
  ) {
    return this.lab.registrarResultado(ordenExamenId, dto, req.usuario!);
  }

  /**
   * PATCH /laboratorio/:id/anular
   * Anula una orden de laboratorio con un motivo
   */
  @Patch(':id/anular')
  anular(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AnularOrdenDto,
    @Req() req: RequestConUsuario,
  ) {
    return this.lab.anular(id, dto, req.usuario!);
  }
}
