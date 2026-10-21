import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ExamenCatalogo } from './examen-catalogo.entity';

@Entity('examen_detalles')
export class ExamenDetalle {
  @PrimaryColumn({ name: 'examen_id', type: 'varchar', length: 20 })
  examenId: string;

  @Column({ name: 'precio_corporativo', type: 'numeric', precision: 10, scale: 2, nullable: true })
  precioCorporativo: number;

  @Column({ name: 'precio_publico', type: 'numeric', precision: 10, scale: 2, nullable: true })
  precioPublico: number;

  @Column({ length: 100, nullable: true })
  muestra: string;

  @Column({ length: 100, nullable: true })
  tubo: string;

  @Column({ length: 100, nullable: true })
  condicion: string;

  @Column({ length: 100, nullable: true })
  tiempo: string;

  @OneToOne(() => ExamenCatalogo, (examen) => examen.detalle, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'examen_id' })
  examen: ExamenCatalogo;
}
