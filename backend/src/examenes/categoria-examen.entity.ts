import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categorias_examen')
export class CategoriaExamen {
  @PrimaryGeneratedColumn({ name: 'categoria_id' })
  id: number;

  @Column({ length: 100 })
  nombre: string;

  // Solo "Exámenes Ecográficos" tiene subcategorías (ver seed 004); el resto
  // queda en null.
  @ManyToOne(() => CategoriaExamen, { nullable: true })
  @JoinColumn({ name: 'categoria_padre_id' })
  categoriaPadre: CategoriaExamen | null;
}
