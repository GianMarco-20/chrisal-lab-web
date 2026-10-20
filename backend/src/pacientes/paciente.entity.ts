import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pacientes')
export class Paciente {
  @PrimaryGeneratedColumn({ name: 'paciente_id' })
  id: number;

  @Column({ name: 'historia_clinica', length: 20, unique: true })
  historiaClinica: string;

  @Column({ length: 15, unique: true })
  dni: string;

  @Column({ length: 100 })
  nombres: string;

  @Column({ length: 100 })
  apellidos: string;

  @Column({ type: 'varchar', length: 1, nullable: true })
  sexo: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  celular: string | null;

  @CreateDateColumn({ name: 'fecha_registro', type: 'timestamp' })
  fechaRegistro: Date;
}
