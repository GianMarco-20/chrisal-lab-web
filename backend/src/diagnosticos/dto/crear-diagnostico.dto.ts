import { Type } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CrearDiagnosticoDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  citaId: number;

  @IsOptional()
  @IsString()
  sintomas?: string;

  @IsString()
  @IsNotEmpty()
  diagnostico: string;

  @IsOptional()
  @IsString()
  indicaciones?: string;

  // IDs del catálogo (examenes_catalogo) que el médico ordena junto con el
  // diagnóstico; se guardan como cita_examenes. Opcional: no todo diagnóstico
  // pide laboratorio.
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @Type(() => Number)
  @IsInt({ each: true })
  @Min(1, { each: true })
  examenIds?: number[];
}
