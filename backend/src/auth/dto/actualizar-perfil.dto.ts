import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

// Lo único que una persona puede cambiar de sí misma. Rol, estado,
// especialidad y DNI los gestiona el administrador en Gestión de Usuarios.
export class ActualizarPerfilDto {
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
}
