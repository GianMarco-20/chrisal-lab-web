import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoriaExamen } from './categoria-examen.entity';

@Entity('examenes_catalogo')
export class ExamenCatalogo {
  @PrimaryGeneratedColumn({ name: 'examen_id' })
  id: number;

  @ManyToOne(() => CategoriaExamen, { nullable: false, eager: true })
  @JoinColumn({ name: 'categoria_id' })
  categoria: CategoriaExamen;

  @Column({ length: 150 })
  nombre: string;
}
