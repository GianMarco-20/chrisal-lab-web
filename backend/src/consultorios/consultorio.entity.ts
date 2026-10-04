import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Solo lo necesario para la relación desde programacion_medica; esta tabla
// no tiene CRUD propio todavía.
@Entity('consultorios')
export class Consultorio {
  @PrimaryGeneratedColumn({ name: 'consultorio_id' })
  id: number;

  @Column({ length: 50 })
  nombre: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  ubicacion: string | null;
}
