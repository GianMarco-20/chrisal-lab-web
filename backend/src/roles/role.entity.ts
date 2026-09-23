import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn({ name: 'rol_id' })
  id: number;

  @Column({ length: 20, unique: true })
  nombre: string;

  @Column({ name: 'es_admin', default: false })
  esAdmin: boolean;
}
