import { Type } from 'class-transformer';
import { IsDateString, IsInt, Matches, Min } from 'class-validator';

export class ReprogramarCitaDto {
  @IsDateString()
  fecha: string;

  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
    message: 'La hora debe tener el formato HH:mm',
  })
  hora: string;

  // A diferencia de CrearCitaDto, aquí es obligatorio: no se puede
  // reprogramar una cita a un horario sin un médico ya programado.
  @Type(() => Number)
  @IsInt()
  @Min(1)
  programacionId: number;
}
