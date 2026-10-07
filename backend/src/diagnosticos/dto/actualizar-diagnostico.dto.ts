import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ActualizarDiagnosticoDto {
  @IsOptional()
  @IsString()
  sintomas?: string;

  @IsString()
  @IsNotEmpty()
  diagnostico: string;

  @IsOptional()
  @IsString()
  indicaciones?: string;
}
