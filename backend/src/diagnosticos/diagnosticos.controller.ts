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
import { ActualizarDiagnosticoDto } from './dto/actualizar-diagnostico.dto';
import { CrearDiagnosticoDto } from './dto/crear-diagnostico.dto';
import { DiagnosticosService } from './diagnosticos.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('recepcion', 'medico')
@Controller('diagnosticos')
export class DiagnosticosController {
  constructor(private readonly diagnosticos: DiagnosticosService) {}

  @Get()
  listar(
    @Req() request: RequestConUsuario,
    @Query('citaId', new ParseIntPipe({ optional: true })) citaId?: number,
  ) {
    return this.diagnosticos.listar(citaId, request.usuario);
  }

  @Get(':id')
  obtener(@Req() request: RequestConUsuario, @Param('id', ParseIntPipe) id: number) {
    return this.diagnosticos.obtener(id, request.usuario);
  }

  @Roles('medico')
  @Post()
  crear(@Body() dto: CrearDiagnosticoDto) {
    return this.diagnosticos.crear(dto);
  }

  @Roles('medico')
  @Patch(':id')
  actualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarDiagnosticoDto) {
    return this.diagnosticos.actualizar(id, dto);
  }

  @Roles('medico')
  @Delete(':id')
  @HttpCode(204)
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.diagnosticos.eliminar(id);
  }
}
