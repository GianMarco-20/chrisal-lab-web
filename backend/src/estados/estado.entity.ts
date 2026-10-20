import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type AmbitoEstado = 'cita' | 'laboratorio';

@Entity('estados')
export class Estado {
  @PrimaryGeneratedColumn({ name: 'estado_id' })
  id: number;

  @Column({ length: 30, unique: true })
  codigo: string;

  @Column({ length: 50 })
  nombre: string;

  @Column({ length: 20 })
  ambito: AmbitoEstado;

  @Column({ type: 'varchar', length: 150, nullable: true })
  descripcion: string | null;

  @Column({ length: 20 })
  color: string;

  @Column({ type: 'smallint' })
  orden: number;
}
