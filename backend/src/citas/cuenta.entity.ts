import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Paciente } from '../pacientes/paciente.entity';

/**
 * Una "cuenta" agrupa las citas de un paciente. Un paciente puede tener
 * varias cuentas a lo largo del tiempo; las citas nuevas reutilizan la más
 * reciente en vez de abrir una por cada cita.
 */
@Entity('cuentas')
export class Cuenta {
  @PrimaryGeneratedColumn({ name: 'cuenta_id' })
  id: number;

  @ManyToOne(() => Paciente, { nullable: false, eager: true })
  @JoinColumn({ name: 'historia_clinica' })
  paciente: Paciente;

  @CreateDateColumn({ name: 'fecha_apertura', type: 'timestamp' })
  fechaApertura: Date;
}
