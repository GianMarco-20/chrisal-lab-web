import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { LIMITES_TRIAJE as L, PATRON_PRESION } from '../limites-triaje';

export class CrearTriajeDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  citaId: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(L.peso.min)
  @Max(L.peso.max)
  peso?: number; // kg

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(L.talla.min)
  @Max(L.talla.max)
  talla?: number; // cm

  @IsOptional()
  @IsString()
  @MaxLength(15)
  @Matches(PATRON_PRESION, { message: 'La presión arterial debe tener el formato 120/80.' })
  presionArterial?: string; // ej. "120/80"

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(L.temperatura.min)
  @Max(L.temperatura.max)
  temperatura?: number; // °C

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(L.frecuenciaCardiaca.min)
  @Max(L.frecuenciaCardiaca.max)
  frecuenciaCardiaca?: number; // lpm

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(L.frecuenciaRespiratoria.min)
  @Max(L.frecuenciaRespiratoria.max)
  frecuenciaRespiratoria?: number; // rpm

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(L.saturacionO2.min)
  @Max(L.saturacionO2.max)
  saturacionO2?: number; // %

  @IsOptional()
  @IsString()
  motivoConsulta?: string;
}
