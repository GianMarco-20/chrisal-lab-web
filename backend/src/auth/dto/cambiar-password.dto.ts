import { IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';

export class CambiarPasswordDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(72)
  passwordActual: string;

  // bcrypt solo considera los primeros 72 bytes de la contraseña.
  @IsString()
  @Length(8, 72)
  passwordNueva: string;
}
