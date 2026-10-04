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
import { ActualizarDiagnosticoDto } from './dto/actualizar-diagnostico.dto';
import { CrearDiagnosticoDto } from './dto/crear-diagnostico.dto';
import { DiagnosticosService } from './diagnosticos.service';

@UseGuards(JwtAuthGuard)
@Controller('diagnosticos')
export class DiagnosticosController {
  constructor(private readonly diagnosticos: DiagnosticosService) {}

  @Get()
  listar(@Query('citaId', new ParseIntPipe({ optional: true })) citaId?: number) {
    return this.diagnosticos.listar(citaId);
  }

  @Get(':id')
  obtener(@Param('id', ParseIntPipe) id: number) {
    return this.diagnosticos.obtener(id);
  }

  @Post()
  crear(@Body() dto: CrearDiagnosticoDto) {
    return this.diagnosticos.crear(dto);
  }

  @Patch(':id')
  actualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarDiagnosticoDto) {
    return this.diagnosticos.actualizar(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.diagnosticos.eliminar(id);
  }
}
