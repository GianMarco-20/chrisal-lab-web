import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { PacientesModule } from '../pacientes/pacientes.module';
import { ProgramacionMedica } from '../programacion-medica/programacion-medica.entity';
import { Cita } from './cita.entity';
import { CitasController } from './citas.controller';
import { CitasService } from './citas.service';
import { Cuenta } from './cuenta.entity';
import { EstadoCita } from './estado-cita.entity';
import { Servicio } from './servicio.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cita, Cuenta, Servicio, EstadoCita, ProgramacionMedica]),
    PacientesModule,
    AuthModule,
  ],
  controllers: [CitasController],
  providers: [CitasService],
})
export class CitasModule {}
