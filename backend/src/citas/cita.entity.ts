import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProgramacionMedica } from '../programacion-medica/programacion-medica.entity';
import { Cuenta } from './cuenta.entity';
import { EstadoCita } from './estado-cita.entity';
import { Servicio } from './servicio.entity';

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

  // El médico asignado a la cita es, en realidad, "qué horario programado
  // (programacion_medica) ocupa esta cita": de ahí sale el médico, el
  // consultorio y el turno. Sigue siendo opcional (una cita puede quedar
  // "Por asignar" si no se eligió un horario ya programado al crearla).
  @Column({ name: 'programacion_id', type: 'integer', nullable: true })
  programacionId: number | null;

  @ManyToOne(() => ProgramacionMedica, { nullable: true, eager: true })
  @JoinColumn({ name: 'programacion_id' })
  programacionMedica: ProgramacionMedica | null;

  @ManyToOne(() => EstadoCita, { nullable: false, eager: true })
  @JoinColumn({ name: 'estado_id' })
  estado: EstadoCita;

  @CreateDateColumn({ name: 'fecha_registro', type: 'timestamp' })
  fechaRegistro: Date;
}
