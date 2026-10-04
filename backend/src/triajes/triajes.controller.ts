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
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ActualizarTriajeDto } from './dto/actualizar-triaje.dto';
import { CrearTriajeDto } from './dto/crear-triaje.dto';
import { TriajesService } from './triajes.service';

@UseGuards(JwtAuthGuard)
@Controller('triajes')
export class TriajesController {
  constructor(private readonly triajes: TriajesService) {}

  @Get()
  listar(@Query('citaId', new ParseIntPipe({ optional: true })) citaId?: number) {
    return this.triajes.listar(citaId);
  }

  @Get(':id')
  obtener(@Param('id', ParseIntPipe) id: number) {
    return this.triajes.obtener(id);
  }

  @Post()
  crear(@Body() dto: CrearTriajeDto) {
    return this.triajes.crear(dto);
  }

  @Patch(':id')
  actualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarTriajeDto) {
    return this.triajes.actualizar(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.triajes.eliminar(id);
  }
}
