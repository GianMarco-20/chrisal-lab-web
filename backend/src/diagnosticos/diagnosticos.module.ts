import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CitaExamenesModule } from '../cita-examenes/cita-examenes.module';
import { Cita } from '../citas/cita.entity';
import { EstadoCita } from '../citas/estado-cita.entity';
import { Diagnostico } from './diagnostico.entity';
import { DiagnosticosController } from './diagnosticos.controller';
import { DiagnosticosService } from './diagnosticos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Diagnostico, Cita, EstadoCita]),
    AuthModule,
    CitaExamenesModule,
  ],
  controllers: [DiagnosticosController],
  providers: [DiagnosticosService],
  exports: [DiagnosticosService],
})
export class DiagnosticosModule {}
