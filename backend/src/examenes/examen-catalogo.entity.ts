import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { CategoriaExamen } from './categoria-examen.entity';
import { ExamenDetalle } from './examen-detalle.entity';

@Entity('examenes_catalogo')
export class ExamenCatalogo {
  @PrimaryColumn({ name: 'examen_id', type: 'varchar', length: 20 })
  id: string;

  @ManyToOne(() => CategoriaExamen, { nullable: false, eager: true })
  @JoinColumn({ name: 'categoria_id' })
  categoria: CategoriaExamen;

  @Column({ length: 150 })
  nombre: string;

  @OneToOne(() => ExamenDetalle, (detalle) => detalle.examen, { eager: true, nullable: true })
  detalle?: ExamenDetalle;
}
