import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrdenLaboratorio } from './orden-laboratorio.entity';
import { ExamenCatalogo } from '../examenes/examen-catalogo.entity';
export { ExamenCatalogo };

export type EstadoExamen = 'pendiente' | 'con_resultado';

@Entity('orden_examenes')
export class OrdenExamen {
  @PrimaryGeneratedColumn({ name: 'orden_examen_id' })
  id: number;

  @ManyToOne(() => OrdenLaboratorio, { nullable: false })
  @JoinColumn({ name: 'orden_id' })
  orden: OrdenLaboratorio;

  @Column({ name: 'orden_id' })
  ordenId: number;

  @ManyToOne(() => ExamenCatalogo, { nullable: false, eager: true })
  @JoinColumn({ name: 'examen_id' })
  examen: ExamenCatalogo;

  @Column({ length: 20, default: 'pendiente' })
  estado: EstadoExamen;
}
