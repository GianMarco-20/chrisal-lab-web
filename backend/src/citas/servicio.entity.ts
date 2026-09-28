import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('servicios')
export class Servicio {
  @PrimaryGeneratedColumn({ name: 'servicio_id' })
  id: number;

  @Column({ length: 50, unique: true })
  nombre: string;

  // 'consultorio' | 'laboratorio', según el CHECK de la tabla.
  @Column({ length: 20 })
  tipo: string;
}
