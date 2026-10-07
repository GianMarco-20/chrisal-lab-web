import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CrearTriajeDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  citaId: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(999.99)
  peso?: number; // kg

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(999.9)
  talla?: number; // cm

  @IsOptional()
  @IsString()
  @MaxLength(15)
  presionArterial?: string; // ej. "120/80"

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(99.9)
  temperatura?: number; // °C

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  frecuenciaCardiaca?: number; // lpm

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  frecuenciaRespiratoria?: number; // rpm

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  saturacionO2?: number; // %

  @IsOptional()
  @IsString()
  motivoConsulta?: string;
}
