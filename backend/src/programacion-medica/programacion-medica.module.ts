import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Consultorio } from '../consultorios/consultorio.entity';
import { Medico } from '../medicos/medico.entity';
import { ProgramacionMedicaController } from './programacion-medica.controller';
import { ProgramacionMedica } from './programacion-medica.entity';
import { ProgramacionMedicaService } from './programacion-medica.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProgramacionMedica, Medico, Consultorio]),
    AuthModule,
  ],
  controllers: [ProgramacionMedicaController],
  providers: [ProgramacionMedicaService],
  exports: [ProgramacionMedicaService],
})
export class ProgramacionMedicaModule {}
