import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Paciente } from '../pacientes/paciente.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { EstadoLab } from './estado-lab.entity';

@Entity('ordenes_laboratorio')
export class OrdenLaboratorio {
  @PrimaryGeneratedColumn({ name: 'orden_id' })
  id: number;

  @ManyToOne(() => Paciente, { nullable: false, eager: true })
  @JoinColumn({ name: 'historia_clinica', referencedColumnName: 'historiaClinica' })
  paciente: Paciente;

  @ManyToOne(() => EstadoLab, { nullable: false, eager: true })
  @JoinColumn({ name: 'id_estado' })
  estado: EstadoLab;

  @Column({ name: 'fecha_muestra', type: 'timestamp' })
  fechaMuestra: Date;

  @ManyToOne(() => Usuario, { nullable: false, eager: true })
  @JoinColumn({ name: 'usuario_muestra_id' })
  usuarioMuestra: Usuario;

  @ManyToOne(() => Usuario, { nullable: true, eager: true })
  @JoinColumn({ name: 'usuario_resultado_id' })
  usuarioResultado: Usuario | null;

  @Column({ name: 'fecha_resultado', type: 'timestamp', nullable: true })
  fechaResultado: Date | null;

  @Column({ name: 'motivo_anulacion', type: 'text', nullable: true })
  motivoAnulacion: string | null;

  @ManyToOne(() => Usuario, { nullable: true, eager: true })
  @JoinColumn({ name: 'usuario_anulacion_id' })
  usuarioAnulacion: Usuario | null;

  @Column({ name: 'fecha_anulacion', type: 'timestamp', nullable: true })
  fechaAnulacion: Date | null;

  @CreateDateColumn({ name: 'fecha_registro', type: 'timestamp' })
  fechaRegistro: Date;
}
