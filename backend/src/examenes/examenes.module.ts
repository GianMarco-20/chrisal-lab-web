import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CategoriaExamen } from './categoria-examen.entity';
import { ExamenCatalogo } from './examen-catalogo.entity';
import { ExamenesController } from './examenes.controller';
import { ExamenesService } from './examenes.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExamenCatalogo, CategoriaExamen]), AuthModule],
  controllers: [ExamenesController],
  providers: [ExamenesService],
  exports: [ExamenesService],
})
export class ExamenesModule {}
