import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExamenCatalogo } from './examen-catalogo.entity';

export type TipoParametro = 'numero' | 'texto' | 'opcion';

// numeric de Postgres llega como texto; se convierte a número (o null).
const numero = {
  to: (valor: number | null | undefined) => valor ?? null,
  from: (valor: string | null) => (valor === null ? null : Number(valor)),
};

/**
 * Un campo de un examen (p. ej. "Bilirrubina Directa") con su unidad y sus
 * valores de referencia. Si el rango cambia por sexo o por edad, el mismo campo
 * aparece en varias filas. `clave` es la que usa el formato de resultado.
 */
@Entity('examen_parametros')
export class ExamenParametro {
  @PrimaryGeneratedColumn({ name: 'parametro_id' })
  id: number;

  @ManyToOne(() => ExamenCatalogo, (examen) => examen.parametros, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'examen_id' })
  examen: ExamenCatalogo;

  @Column({ length: 50 })
  clave: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  unidad: string | null;

  @Column({ length: 10, default: 'numero' })
  tipo: TipoParametro;

  // 'NEGATIVO,POSITIVO' cuando tipo = 'opcion'.
  @Column({ type: 'varchar', length: 200, nullable: true })
  opciones: string | null;

  @Column({ type: 'smallint', default: 1 })
  orden: number;

  @Column({ type: 'char', length: 1, nullable: true })
  sexo: 'M' | 'F' | null;

  @Column({ name: 'edad_min', type: 'smallint', nullable: true })
  edadMin: number | null;

  @Column({ name: 'edad_max', type: 'smallint', nullable: true })
  edadMax: number | null;

  @Column({ name: 'ref_min', type: 'numeric', precision: 12, scale: 3, nullable: true, transformer: numero })
  refMin: number | null;

  @Column({ name: 'ref_max', type: 'numeric', precision: 12, scale: 3, nullable: true, transformer: numero })
  refMax: number | null;

  // Tal como se imprime: "2.4 – 5.7", "Menor a 200". Puede tener varias líneas
  // (fases del ciclo, edades, condiciones), una por renglón.
  @Column({ name: 'ref_texto', type: 'varchar', length: 400, nullable: true })
  refTexto: string | null;
}
