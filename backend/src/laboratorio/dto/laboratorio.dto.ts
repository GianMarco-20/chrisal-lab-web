import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CrearPacienteDto } from '../../pacientes/dto/crear-paciente.dto';

export class CrearOrdenLaboratorioDto {
  @ValidateNested()
  @Type(() => CrearPacienteDto)
  paciente: CrearPacienteDto;

  @IsArray()
  @ArrayMinSize(1, { message: 'Debe seleccionar al menos un examen' })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  examenesIds: number[];
}

export class RegistrarResultadoDto {
  @IsString()
  @IsNotEmpty()
  resultadoTexto: string;
}

export class AnularOrdenDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  motivoAnulacion: string;
}
