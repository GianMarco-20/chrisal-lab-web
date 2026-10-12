import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { PacientesModule } from '../pacientes/pacientes.module';
import { EstadoLab } from './estado-lab.entity';
import { LaboratorioController } from './laboratorio.controller';
import { LaboratorioService } from './laboratorio.service';
import { ExamenCatalogo, OrdenExamen } from './orden-examen.entity';
import { OrdenLaboratorio } from './orden-laboratorio.entity';
import { ResultadoOrden } from './resultado-orden.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrdenLaboratorio,
      OrdenExamen,
      ResultadoOrden,
      EstadoLab,
      ExamenCatalogo,
    ]),
    PacientesModule,
    AuthModule,
  ],
  controllers: [LaboratorioController],
  providers: [LaboratorioService],
})
export class LaboratorioModule {}
