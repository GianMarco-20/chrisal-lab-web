import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Consultorio } from '../consultorios/consultorio.entity';
import { Medico } from '../medicos/medico.entity';

export type Turno = 'mañana' | 'tarde';

@Entity('programacion_medica')
export class ProgramacionMedica {
  @PrimaryGeneratedColumn({ name: 'programacion_id' })
  id: number;

  @ManyToOne(() => Medico, { nullable: false, eager: true })
  @JoinColumn({ name: 'medico_id' })
  medico: Medico;

  @ManyToOne(() => Consultorio, { nullable: false, eager: true })
  @JoinColumn({ name: 'consultorio_id' })
  consultorio: Consultorio;

  @Column({ type: 'date' })
  fecha: string;

  // 'mañana' | 'tarde', según el CHECK de la tabla.
  @Column({ type: 'varchar', length: 10 })
  turno: Turno;

  @Column({ name: 'hora_inicio', type: 'time' })
  horaInicio: string;

  @Column({ name: 'hora_fin', type: 'time' })
  horaFin: string;
}
