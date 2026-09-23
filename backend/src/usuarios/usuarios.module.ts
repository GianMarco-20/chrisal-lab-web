import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../roles/role.entity';
import { Usuario } from './usuario.entity';
import { UsuariosService } from './usuarios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Role])],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
