import { IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';

/**
 * Datos para dar de alta un médico desde Programación Médica. El médico necesita
 * una cuenta para iniciar sesión, así que se crea junto con su usuario (rol médico).
 */
export class CrearMedicoDto {
  @IsString()
  @Length(3, 50)
  nombreUsuario: string;

  @IsString()
  @Length(8, 72)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  nombres: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  apellidos: string;

  @IsOptional()
  @Matches(/^\d{8}$/, { message: 'El DNI debe tener 8 dígitos' })
  dni?: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  especialidad: string;
}
