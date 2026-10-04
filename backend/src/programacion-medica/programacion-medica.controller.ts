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
import { ActualizarProgramacionMedicaDto } from './dto/actualizar-programacion-medica.dto';
import { CrearProgramacionMedicaDto } from './dto/crear-programacion-medica.dto';
import { ProgramacionMedicaService } from './programacion-medica.service';

@UseGuards(JwtAuthGuard)
@Controller('programacion-medica')
export class ProgramacionMedicaController {
  constructor(private readonly programaciones: ProgramacionMedicaService) {}

  @Get()
  listar(@Query('fecha') fecha?: string) {
    return this.programaciones.listar(fecha);
  }

  @Get(':id')
  obtener(@Param('id', ParseIntPipe) id: number) {
    return this.programaciones.obtener(id);
  }

  @Post()
  crear(@Body() dto: CrearProgramacionMedicaDto) {
    return this.programaciones.crear(dto);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarProgramacionMedicaDto,
  ) {
    return this.programaciones.actualizar(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.programaciones.eliminar(id);
  }
}
