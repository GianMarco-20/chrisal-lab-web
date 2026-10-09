import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Consultorio } from './consultorio.entity';
import { ConsultoriosController } from './consultorios.controller';
import { ConsultoriosService } from './consultorios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Consultorio]), AuthModule],
  controllers: [ConsultoriosController],
  providers: [ConsultoriosService],
  exports: [ConsultoriosService],
})
export class ConsultoriosModule {}
