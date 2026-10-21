import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Cuenta } from '../citas/cuenta.entity';
import { PacientesModule } from '../pacientes/pacientes.module';
import { EstadoLab } from './estado-lab.entity';
import { LaboratorioController } from './laboratorio.controller';
import { LaboratorioService } from './laboratorio.service';
import { ExamenCatalogo } from '../examenes/examen-catalogo.entity';
import { OrdenExamen } from './orden-examen.entity';
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
      Cuenta,
    ]),
    PacientesModule,
    AuthModule,
  ],
  controllers: [LaboratorioController],
  providers: [LaboratorioService],
})
export class LaboratorioModule {}
