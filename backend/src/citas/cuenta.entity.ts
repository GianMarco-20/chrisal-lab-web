import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Paciente } from '../pacientes/paciente.entity';

/**
 * Una "cuenta" agrupa las atenciones (citas, órdenes) de un paciente.
 */
@Entity('cuentas')
export class Cuenta {
  @PrimaryGeneratedColumn({ name: 'cuenta_id' })
  id: number;

  @ManyToOne(() => Paciente, { nullable: false, eager: true })
  @JoinColumn({ name: 'paciente_id' })
  paciente: Paciente;

  @CreateDateColumn({ name: 'fecha_apertura', type: 'timestamp' })
  fechaApertura: Date;
}
