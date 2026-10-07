import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class CrearCitaExamenDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  citaId: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  examenId: number;
}
