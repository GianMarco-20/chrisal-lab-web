import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  @ManyToOne(() => Role, { nullable: false, eager: true })
  @JoinColumn({ name: 'rol_id' })
  rol: Role;

  @Column({ name: 'medico_id', type: 'integer', nullable: true })
  medicoId: number | null;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @Column({ name: 'ultimo_login', type: 'timestamp', nullable: true })
  ultimoLogin: Date | null;
}
