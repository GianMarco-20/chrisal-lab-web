import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CitaExamenesModule } from './cita-examenes/cita-examenes.module';
import { CitasModule } from './citas/citas.module';
import { ConsultoriosModule } from './consultorios/consultorios.module';
import { ServiciosModule } from './servicios/servicios.module';
import { DiagnosticosModule } from './diagnosticos/diagnosticos.module';
import { ExamenesModule } from './examenes/examenes.module';
import { LaboratorioModule } from './laboratorio/laboratorio.module';
import { MedicosModule } from './medicos/medicos.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { ProgramacionMedicaModule } from './programacion-medica/programacion-medica.module';
import { TriajesModule } from './triajes/triajes.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.getOrThrow<string>('DB_HOST'),
        port: Number(config.getOrThrow<string>('DB_PORT')),
        username: config.getOrThrow<string>('DB_USER'),
        password: config.getOrThrow<string>('DB_PASSWORD'),
        database: config.getOrThrow<string>('DB_NAME'),
        autoLoadEntities: true,
        // La estructura de la base se maneja con database/migrations, no con TypeORM.
        synchronize: false,
      }),
    }),
    UsuariosModule,
    AuthModule,
    PacientesModule,
    CitasModule,
    MedicosModule,
    ConsultoriosModule,
    ServiciosModule,
    ProgramacionMedicaModule,
    TriajesModule,
    ExamenesModule,
    CitaExamenesModule,
    DiagnosticosModule,
    LaboratorioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
