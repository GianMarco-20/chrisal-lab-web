import { Transform, Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

// Todos los pacientes se guardan en mayúsculas, sin importar cómo los haya
// escrito quien registra (recepción, el formulario de citas, Postman, etc.).
const aMayusculas = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim().toUpperCase() : value;

export class CrearPacienteDto {
  @IsString()
  @Matches(/^\d{8}$/, { message: 'El DNI debe tener 8 dígitos' })
  dni: string;

  @Transform(aMayusculas)
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombres: string;

  @Transform(aMayusculas)
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  apellidos: string;

  @IsOptional()
  @IsIn(['M', 'F'])
  sexo?: string;

  // Obligatoria: ajusta los rangos del triaje. Se vuelve a pedir en cada cita.
  @Type(() => Number)
  @IsInt({ message: 'La edad debe ser un número entero de años' })
  @Min(0, { message: 'La edad no puede ser negativa' })
  @Max(120, { message: 'La edad no puede ser mayor de 120 años' })
  edad: number;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  celular?: string;
}
