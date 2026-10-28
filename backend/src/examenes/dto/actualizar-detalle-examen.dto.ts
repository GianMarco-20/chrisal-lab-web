import { IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

/**
 * Datos de examen_detalles que recepción o laboratorio pueden completar o
 * corregir. Lo que no se envía no se toca; null (o texto vacío) lo deja vacío.
 */
export class ActualizarDetalleExamenDto {
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precioPublico?: number | null;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precioCorporativo?: number | null;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  muestra?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  tubo?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  condicion?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  tiempo?: string | null;
}
