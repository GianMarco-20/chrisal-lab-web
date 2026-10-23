import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { OrdenExamen } from './orden-examen.entity';
import { ResultadoValor } from './resultado-valor.entity';

@Entity('resultados_orden')
export class ResultadoOrden {
  @PrimaryGeneratedColumn({ name: 'resultado_id' })
  id: number;

  @OneToOne(() => OrdenExamen, { nullable: false, eager: true })
  @JoinColumn({ name: 'orden_examen_id' })
  ordenExamen: OrdenExamen;

  @Column({ name: 'resultado_texto', type: 'text' })
  resultadoTexto: string;

  @ManyToOne(() => Usuario, { nullable: false, eager: true })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @CreateDateColumn({ name: 'fecha_registro', type: 'timestamp' })
  fechaRegistro: Date;

  // Lo registrado desglosado por campo (ver ResultadoValor).
  @OneToMany(() => ResultadoValor, (valor) => valor.resultado)
  valores?: ResultadoValor[];
}
