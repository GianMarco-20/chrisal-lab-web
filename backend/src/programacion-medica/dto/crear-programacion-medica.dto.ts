import { Type } from 'class-transformer';
import { IsDateString, IsIn, IsInt, Matches, Min } from 'class-validator';
import type { Turno } from '../programacion-medica.entity';

const HORA_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;
const MENSAJE_HORA = 'Debe tener el formato HH:mm';

export class CrearProgramacionMedicaDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  medicoId: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  consultorioId: number;

  @IsDateString()
  fecha: string;

  @IsIn(['mañana', 'tarde'])
  turno: Turno;

  @Matches(HORA_REGEX, { message: MENSAJE_HORA })
  horaInicio: string;

  @Matches(HORA_REGEX, { message: MENSAJE_HORA })
  horaFin: string;
}
