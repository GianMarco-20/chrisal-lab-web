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
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CitaExamenesService } from './cita-examenes.service';
import { CrearCitaExamenDto } from './dto/crear-cita-examen.dto';

@UseGuards(JwtAuthGuard)
@Controller('cita-examenes')
export class CitaExamenesController {
  constructor(private readonly citaExamenes: CitaExamenesService) {}

  @Get()
  listar(@Query('citaId', new ParseIntPipe({ optional: true })) citaId?: number) {
    return this.citaExamenes.listar(citaId);
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
