import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';

@Entity('medicos')
export class Medico {
  @PrimaryGeneratedColumn({ name: 'medico_id' })
  id: number;

  @OneToOne(() => Usuario, (usuario) => usuario.medico, { nullable: false, eager: true })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ length: 100 })
  especialidad: string;

  @Column({ type: 'varchar', length: 15, nullable: true, unique: true })
  cmp: string | null;

  get nombres(): string {
    return this.usuario?.nombres ?? '';
  }

  get apellidos(): string {
    return this.usuario?.apellidos ?? '';
  }

  get dni(): string | null {
    return this.usuario?.dni ?? null;
  }
}
