import { IsNotEmpty, IsString } from 'class-validator';

export class ActualizarDiagnosticoDto {
  @IsString()
  @IsNotEmpty()
  diagnostico: string;
}
