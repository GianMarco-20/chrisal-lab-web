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

// Igual que CrearTriajeDto, pero sin citaId: el triaje no cambia de cita
// una vez creado, solo se corrigen sus datos.
export class ActualizarTriajeDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(L.peso.min)
  @Max(L.peso.max)
  peso?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(L.talla.min)
  @Max(L.talla.max)
  talla?: number;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  @Matches(PATRON_PRESION, { message: 'La presión arterial debe tener el formato 120/80.' })
  presionArterial?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(L.temperatura.min)
  @Max(L.temperatura.max)
  temperatura?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(L.frecuenciaCardiaca.min)
  @Max(L.frecuenciaCardiaca.max)
  frecuenciaCardiaca?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(L.frecuenciaRespiratoria.min)
  @Max(L.frecuenciaRespiratoria.max)
  frecuenciaRespiratoria?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(L.saturacionO2.min)
  @Max(L.saturacionO2.max)
  saturacionO2?: number;

  @IsOptional()
  @IsString()
  motivoConsulta?: string;
}
