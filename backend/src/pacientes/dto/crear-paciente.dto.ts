import { Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

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

  @IsOptional()
  @IsString()
  @MaxLength(20)
  celular?: string;
}
