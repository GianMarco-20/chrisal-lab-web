import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { RequestConUsuario } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CitaExamenesService } from './cita-examenes.service';
import { CrearCitaExamenDto } from './dto/crear-cita-examen.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('recepcion', 'medico', 'laboratorio')
@Controller('cita-examenes')
export class CitaExamenesController {
  constructor(private readonly citaExamenes: CitaExamenesService) {}

  @Get()
  listar(
    @Req() request: RequestConUsuario,
    @Query('citaId', new ParseIntPipe({ optional: true })) citaId?: number,
  ) {
    return this.citaExamenes.listar(citaId, request.usuario);
  }

  @Post()
  crear(@Body() dto: CrearCitaExamenDto) {
    return this.citaExamenes.crear(dto);
  }

  @Delete(':id')
  @HttpCode(204)
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.citaExamenes.eliminar(id);
  }
}
