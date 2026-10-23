import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categorias_examen')
export class CategoriaExamen {
  @PrimaryGeneratedColumn({ name: 'categoria_id' })
  id: number;

  @Column({ length: 100 })
  nombre: string;
}
