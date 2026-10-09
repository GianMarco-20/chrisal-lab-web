import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { AdminGuard } from './admin.guard';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

const OCHO_HORAS = 60 * 60 * 8;

@Module({
  imports: [
    // UsuariosModule necesita JwtAuthGuard/AdminGuard para proteger sus
    // rutas, y AuthService necesita UsuariosService: forwardRef rompe el ciclo.
    forwardRef(() => UsuariosModule),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: Number(config.get('JWT_EXPIRES_IN_SECONDS') ?? OCHO_HORAS),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, AdminGuard],
  // Los módulos que usen JwtAuthGuard/AdminGuard importan AuthModule.
  exports: [JwtModule, JwtAuthGuard, AdminGuard],
})
export class AuthModule {}
