import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombreUsuario: string;

  // bcrypt solo considera los primeros 72 bytes de la contraseña.
  @IsString()
  @IsNotEmpty()
  @MaxLength(72)
  password: string;
}
