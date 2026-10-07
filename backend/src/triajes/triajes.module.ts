import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Cita } from '../citas/cita.entity';
import { EstadoCita } from '../citas/estado-cita.entity';
import { Triaje } from './triaje.entity';
import { TriajesController } from './triajes.controller';
import { TriajesService } from './triajes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Triaje, Cita, EstadoCita]), AuthModule],
  controllers: [TriajesController],
  providers: [TriajesService],
  exports: [TriajesService],
})
export class TriajesModule {}
