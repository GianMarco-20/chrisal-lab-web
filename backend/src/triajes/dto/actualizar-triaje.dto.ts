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

// Igual que CrearTriajeDto, pero sin citaId: el triaje no cambia de cita
// una vez creado, solo se corrigen sus datos.
export class ActualizarTriajeDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(999.99)
  peso?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(999.9)
  talla?: number;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  presionArterial?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(99.9)
  temperatura?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  frecuenciaCardiaca?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  saturacionO2?: number;

  @IsOptional()
  @IsString()
  motivoConsulta?: string;
}
