import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { ExamenCatalogo } from './examen-catalogo.entity';

@Entity('paquetes_laboratorio')
export class PaqueteLaboratorio {
  @PrimaryColumn({ name: 'paquete_id', type: 'varchar', length: 60 })
  id: string;

  @Column({ length: 150, unique: true })
  nombre: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string | number) => Number(value),
    },
  })
  precio: number;

  @ManyToMany(() => ExamenCatalogo, { eager: true })
  @JoinTable({
    name: 'paquetes_laboratorio_examenes',
    joinColumn: { name: 'paquete_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'examen_id', referencedColumnName: 'id' },
  })
  examenes: ExamenCatalogo[];
}
