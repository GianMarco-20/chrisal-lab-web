import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cita } from '../citas/cita.entity';

// Postgres/TypeORM devuelven numeric como texto (para no perder precisión);
// aquí no hace falta esa precisión extrema, así que se convierte a number
// para que la API sea más simple de consumir.
const numericTransformer = {
  to: (valor?: number | null) => valor,
  from: (valor?: string | null) => (valor === null || valor === undefined ? null : parseFloat(valor)),
};

@Entity('triajes')
export class Triaje {
  @PrimaryGeneratedColumn({ name: 'triaje_id' })
  id: number;

  // Una cita tiene a lo más un triaje (cita_id es UNIQUE en la tabla).
  @OneToOne(() => Cita, { nullable: false, eager: true })
  @JoinColumn({ name: 'cita_id' })
  cita: Cita;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true, transformer: numericTransformer })
  peso: number | null; // kg

  @Column({ type: 'numeric', precision: 5, scale: 1, nullable: true, transformer: numericTransformer })
  talla: number | null; // cm

  @Column({ name: 'presion_arterial', type: 'varchar', length: 15, nullable: true })
  presionArterial: string | null; // ej. "120/80"

  @Column({ type: 'numeric', precision: 4, scale: 1, nullable: true, transformer: numericTransformer })
  temperatura: number | null; // °C

  @Column({ name: 'frecuencia_cardiaca', type: 'integer', nullable: true })
  frecuenciaCardiaca: number | null; // lpm

  @Column({ name: 'saturacion_o2', type: 'integer', nullable: true })
  saturacionO2: number | null; // %

  @Column({ name: 'motivo_consulta', type: 'text', nullable: true })
  motivoConsulta: string | null;

  @CreateDateColumn({ name: 'fecha_registro', type: 'timestamp' })
  fechaRegistro: Date;
}
