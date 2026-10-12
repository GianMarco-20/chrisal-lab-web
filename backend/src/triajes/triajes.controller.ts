import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { RequestConUsuario } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ActualizarTriajeDto } from './dto/actualizar-triaje.dto';
import { CrearTriajeDto } from './dto/crear-triaje.dto';
import { TriajesService } from './triajes.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('recepcion', 'medico')
@Controller('triajes')
export class TriajesController {
  constructor(private readonly triajes: TriajesService) {}

  @Get()
  listar(
    @Req() request: RequestConUsuario,
    @Query('citaId', new ParseIntPipe({ optional: true })) citaId?: number,
  ) {
    return this.triajes.listar(citaId, request.usuario);
  }

  @Get(':id')
  obtener(@Req() request: RequestConUsuario, @Param('id', ParseIntPipe) id: number) {
    return this.triajes.obtener(id, request.usuario);
  }

  @Roles('recepcion')
  @Post()
  crear(@Body() dto: CrearTriajeDto) {
    return this.triajes.crear(dto);
  }

  @Roles('recepcion')
  @Patch(':id')
  actualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarTriajeDto) {
    return this.triajes.actualizar(id, dto);
  }

  @Roles('recepcion')
  @Delete(':id')
  @HttpCode(204)
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.triajes.eliminar(id);
  }
}
