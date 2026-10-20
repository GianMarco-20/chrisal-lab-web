import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cuenta } from '../citas/cuenta.entity';
import { Estado } from '../estados/estado.entity';
import { Paciente } from '../pacientes/paciente.entity';
import { Usuario } from '../usuarios/usuario.entity';

@Entity('ordenes_laboratorio')
export class OrdenLaboratorio {
  @PrimaryGeneratedColumn({ name: 'orden_id' })
  id: number;

  @ManyToOne(() => Cuenta, { nullable: false, eager: true })
  @JoinColumn({ name: 'cuenta_id' })
  cuenta: Cuenta;

  get paciente(): Paciente {
    return this.cuenta?.paciente;
  }

  @ManyToOne(() => Estado, { nullable: false, eager: true })
  @JoinColumn({ name: 'estado_id' })
  estado: Estado;

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

  /**
   * JSON.stringify() ignora los getters de clase.
   * Este método asegura que `paciente` aparezca en la raíz del JSON
   * que recibe el frontend, además de `cuenta`.
   */
  toJSON() {
    return {
      ...this,
      paciente: this.cuenta?.paciente ?? null,
    };
  }
}
