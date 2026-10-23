import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { CategoriaExamen } from './categoria-examen.entity';
import { ExamenDetalle } from './examen-detalle.entity';
import { ExamenParametro } from './examen-parametro.entity';

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

  // Campos del examen con su unidad y valores de referencia (no se cargan solos:
  // se piden con un join donde hacen falta, p. ej. el detalle de una orden).
  @OneToMany(() => ExamenParametro, (parametro) => parametro.examen)
  parametros?: ExamenParametro[];
}
