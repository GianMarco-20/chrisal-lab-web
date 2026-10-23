import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ResultadoOrden } from './resultado-orden.entity';

/**
 * Un valor registrado en un resultado, por campo (clave del parámetro).
 * resultados_orden.resultado_texto conserva el JSON del formato; esta tabla lo
 * guarda desglosado para poder consultarlo y compararlo con los rangos.
 */
@Entity('resultado_valores')
@Unique(['resultado', 'clave'])
export class ResultadoValor {
  @PrimaryGeneratedColumn({ name: 'valor_id' })
  id: number;

  @ManyToOne(() => ResultadoOrden, (resultado) => resultado.valores, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'resultado_id' })
  resultado: ResultadoOrden;

  @Column({ length: 50 })
  clave: string;

  @Column({ name: 'valor_texto', length: 200 })
  valorTexto: string;

  // null si el valor no es un número (p. ej. "NEGATIVO").
  @Column({
    name: 'valor_numero',
    type: 'numeric',
    precision: 14,
    scale: 4,
    nullable: true,
    transformer: {
      to: (valor: number | null | undefined) => valor ?? null,
      from: (valor: string | null) => (valor === null ? null : Number(valor)),
    },
  })
  valorNumero: number | null;
}
