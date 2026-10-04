import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CrearDiagnosticoDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  citaId: number;

  @IsString()
  @IsNotEmpty()
  diagnostico: string;
}
