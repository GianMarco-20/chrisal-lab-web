import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class ActualizarUsuarioDto {
  @IsOptional()
  @IsString()
  @Length(3, 50)
  nombreUsuario?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  nombres?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  apellidos?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  rol?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  // Vacío/ausente = no se cambia la contraseña.
  @IsOptional()
  @IsString()
  @Length(8, 72)
  password?: string;

  // Solo tiene efecto si el usuario ya está enlazado a un médico (medicoId).
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  especialidad?: string;
}
