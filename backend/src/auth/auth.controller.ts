import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ActualizarPerfilDto } from './dto/actualizar-perfil.dto';
import { CambiarPasswordDto } from './dto/cambiar-password.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import type { RequestConUsuario } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('perfil')
  perfil(@Req() request: RequestConUsuario) {
    return this.auth.perfil(Number(request.usuario?.sub));
  }

  // Cualquier rol autenticado puede editar su propio perfil y contraseña.
  @UseGuards(JwtAuthGuard)
  @Patch('perfil')
  actualizarPerfil(@Req() request: RequestConUsuario, @Body() dto: ActualizarPerfilDto) {
    return this.auth.actualizarPerfil(Number(request.usuario?.sub), dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('perfil/password')
  @HttpCode(204)
  cambiarPassword(@Req() request: RequestConUsuario, @Body() dto: CambiarPasswordDto) {
    return this.auth.cambiarPassword(Number(request.usuario?.sub), dto);
  }
}
