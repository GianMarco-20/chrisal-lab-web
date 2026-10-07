import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cita } from '../citas/cita.entity';
import { ExamenCatalogo } from '../examenes/examen-catalogo.entity';

@Entity('cita_examenes')
export class CitaExamen {
  @PrimaryGeneratedColumn({ name: 'cita_examen_id' })
  id: number;

  // Una cita puede tener varios exámenes ordenados (cita_id no es único aquí,
  // a diferencia de triajes/diagnosticos).
  @ManyToOne(() => Cita, { nullable: false })
  @JoinColumn({ name: 'cita_id' })
  cita: Cita;

  @ManyToOne(() => ExamenCatalogo, { nullable: false, eager: true })
  @JoinColumn({ name: 'examen_id' })
  examen: ExamenCatalogo;

  // 'pendiente' | 'con_resultado'; lo actualiza el módulo de Laboratorio al
  // registrar el resultado (resultados_examen), que no existe todavía.
  @Column({ length: 20, default: 'pendiente' })
  estado: string;
}
