import { IsNotEmpty, IsString, Length, Matches, ValidateIf } from 'class-validator';

export class CrearUsuarioDto {
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

  /** Debe existir en la tabla roles (seeds/001_roles.sql). */
  @IsString()
  @IsNotEmpty()
  rol: string;

  // Solo si rol = 'medico': crea el registro en medicos y lo enlaza
  // (usuarios.medico_id) para que Programación Médica lo pueda usar.
  @ValidateIf((dto: CrearUsuarioDto) => dto.rol === 'medico')
  @IsString()
  @IsNotEmpty()
  especialidad?: string;

  @ValidateIf((dto: CrearUsuarioDto) => dto.rol === 'medico')
  @Matches(/^\d{8}$/, { message: 'El DNI debe tener 8 dígitos' })
  dni?: string;
}
