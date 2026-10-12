import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Representa una fila de la tabla `estados` con ámbito 'laboratorio'.
 * Se usa solo en el módulo de laboratorio para evitar mezclar estados de consultorio.
 */
@Entity('estados')
export class EstadoLab {
  @PrimaryGeneratedColumn({ name: 'id_estado' })
  id: number;

  @Column({ length: 50 })
  estado: string;

  @Column({ length: 15 })
  ambito: string;
}
