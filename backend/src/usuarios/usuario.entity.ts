import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Medico } from '../medicos/medico.entity';
import { Role } from '../roles/role.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'usuario_id' })
  id: number;

  @Column({ name: 'nombre_usuario', length: 50, unique: true })
  nombreUsuario: string;

  // select: false evita que el hash salga en consultas normales.
  @Column({ name: 'password_hash', length: 255, select: false })
  passwordHash: string;

  @Column({ length: 100 })
  nombres: string;

  @Column({ length: 100 })
  apellidos: string;

  @Column({ type: 'varchar', length: 15, nullable: true, unique: true })
  dni: string | null;

  @ManyToOne(() => Role, { nullable: false, eager: true })
  @JoinColumn({ name: 'rol_id' })
  rol: Role;

  @OneToOne(() => Medico, (medico) => medico.usuario, { nullable: true })
  medico: Medico | null;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @Column({ name: 'ultimo_login', type: 'timestamp', nullable: true })
  ultimoLogin: Date | null;
}
