import { Type } from 'class-transformer';
import { IsDateString, IsIn, IsInt, IsOptional, Matches, Min } from 'class-validator';
import type { Turno } from '../programacion-medica.entity';

const HORA_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;
const MENSAJE_HORA = 'Debe tener el formato HH:mm';

// Todos los campos opcionales: se actualiza solo lo que se mande.
export class ActualizarProgramacionMedicaDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  medicoId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  consultorioId?: number;

  @IsOptional()
  @IsDateString()
  fecha?: string;

  @IsOptional()
  @IsIn(['mañana', 'tarde'])
  turno?: Turno;

  @IsOptional()
  @Matches(HORA_REGEX, { message: MENSAJE_HORA })
  horaInicio?: string;

  @IsOptional()
  @Matches(HORA_REGEX, { message: MENSAJE_HORA })
  horaFin?: string;
}
