import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('pacientes')
export class Paciente {
  @PrimaryColumn({ name: 'historia_clinica', length: 15 })
  historiaClinica: string;

  @Column({ length: 15, unique: true })
  dni: string;

  @Column({ length: 100 })
  nombres: string;

  @Column({ length: 100 })
  apellidos: string;

  // 'M' | 'F', según el CHECK de la tabla. type explícito: con "string | null"
  // TypeORM no puede inferir el tipo de columna por reflection (da "Object").
  @Column({ type: 'varchar', length: 1, nullable: true })
  sexo: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  celular: string | null;

  @CreateDateColumn({ name: 'fecha_registro', type: 'timestamp' })
  fechaRegistro: Date;
}
