import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { CrearPacienteDto } from '../../pacientes/dto/crear-paciente.dto';

export class CrearCitaDto {
  @ValidateNested()
  @Type(() => CrearPacienteDto)
  paciente: CrearPacienteDto;

  /** Nombre exacto de servicios.nombre, p. ej. "Medicina General". */
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  especialidad: string;

  @IsDateString()
  fecha: string;

  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
    message: 'La hora debe tener el formato HH:mm',
  })
  hora: string;

  // Horario ya programado (programacion_medica) al que se asigna la cita;
  // de ahí sale el médico. Opcional: sin esto, la cita queda "Por asignar".
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  programacionId?: number;
}
