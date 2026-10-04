import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Flujo real de una cita: pendiente_triaje -> pendiente_diagnostico ->
 * atendida, o ausente si el paciente no llega. nombre/color/descripcion son
 * para que la interfaz no tenga que repetir ese mapeo por su cuenta.
 */
@Entity('estados_cita')
export class EstadoCita {
  @PrimaryGeneratedColumn({ name: 'estado_id' })
  id: number;

  @Column({ length: 30, unique: true })
  codigo: string;

  @Column({ length: 50 })
  nombre: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  descripcion: string | null;

  @Column({ length: 20 })
  color: string;

  @Column({ type: 'smallint' })
  orden: number;
}
