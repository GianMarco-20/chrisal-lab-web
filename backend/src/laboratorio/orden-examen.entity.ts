import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrdenLaboratorio } from './orden-laboratorio.entity';

// El catálogo de exámenes está en examenes_catalogo
@Entity('examenes_catalogo')
export class ExamenCatalogo {
  @PrimaryGeneratedColumn({ name: 'examen_id' })
  id: number;

  @Column({ name: 'categoria_id' })
  categoriaId: number;

  @Column({ length: 150 })
  nombre: string;
}

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
