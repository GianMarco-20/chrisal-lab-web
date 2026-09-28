import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
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
}
