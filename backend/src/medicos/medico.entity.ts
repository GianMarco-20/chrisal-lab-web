import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Solo lo necesario para la relación desde programacion_medica; esta tabla
// no tiene CRUD propio todavía.
@Entity('medicos')
export class Medico {
  @PrimaryGeneratedColumn({ name: 'medico_id' })
  id: number;

  @Column({ length: 100 })
  nombres: string;

  @Column({ length: 100 })
  apellidos: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  especialidad: string | null;

  @Column({ type: 'varchar', length: 15, nullable: true })
  dni: string | null;
}
