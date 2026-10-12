import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { Cita } from '../citas/cita.entity';
import { ExamenCatalogo } from '../examenes/examen-catalogo.entity';
import { CitaExamen } from './cita-examen.entity';
import { CitaExamenesController } from './cita-examenes.controller';
import { CitaExamenesService } from './cita-examenes.service';

@Module({
  imports: [TypeOrmModule.forFeature([CitaExamen, Cita, ExamenCatalogo]), AuthModule, UsuariosModule],
  controllers: [CitaExamenesController],
  providers: [CitaExamenesService],
  exports: [CitaExamenesService],
})
export class CitaExamenesModule {}
