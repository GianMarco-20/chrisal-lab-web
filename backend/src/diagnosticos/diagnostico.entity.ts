import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cita } from '../citas/cita.entity';

@Entity('diagnosticos')
export class Diagnostico {
  @PrimaryGeneratedColumn({ name: 'diagnostico_id' })
  id: number;

  // Una cita tiene a lo más un diagnóstico (cita_id es UNIQUE en la tabla).
  @OneToOne(() => Cita, { nullable: false, eager: true })
  @JoinColumn({ name: 'cita_id' })
  cita: Cita;

  @Column({ type: 'text' })
  diagnostico: string;

  @CreateDateColumn({ name: 'fecha_registro', type: 'timestamp' })
  fechaRegistro: Date;
}
