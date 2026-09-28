import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cuenta } from './cuenta.entity';
import { Servicio } from './servicio.entity';

export type EstadoCita = 'programada' | 'atendida' | 'no_asistio';

@Entity('citas')
export class Cita {
  @PrimaryGeneratedColumn({ name: 'cita_id' })
  id: number;

  @ManyToOne(() => Cuenta, { nullable: false, eager: true })
  @JoinColumn({ name: 'cuenta_id' })
  cuenta: Cuenta;

  @ManyToOne(() => Servicio, { nullable: false, eager: true })
  @JoinColumn({ name: 'servicio_id' })
  servicio: Servicio;

  @Column({ name: 'fecha_cita', type: 'date' })
  fechaCita: string;

  @Column({ name: 'hora_inicio', type: 'time' })
  horaInicio: string;

  @Column({ name: 'hora_fin', type: 'time' })
  horaFin: string;

  // FK a programacion_medica; ese módulo no existe todavía en el backend,
  // así que por ahora se deja sin asignar (null) en vez de mapear la relación.
  @Column({ name: 'programacion_id', type: 'integer', nullable: true })
  programacionId: number | null;

  @Column({ length: 20, default: 'programada' })
  estado: EstadoCita;

  @CreateDateColumn({ name: 'fecha_registro', type: 'timestamp' })
  fechaRegistro: Date;
}
