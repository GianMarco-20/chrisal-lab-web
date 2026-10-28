import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActualizarDetalleExamenDto } from './dto/actualizar-detalle-examen.dto';
import { ExamenCatalogo } from './examen-catalogo.entity';
import { ExamenDetalle } from './examen-detalle.entity';

@Injectable()
export class ExamenesService {
  constructor(
    @InjectRepository(ExamenCatalogo) private readonly examenes: Repository<ExamenCatalogo>,
    @InjectRepository(ExamenDetalle) private readonly detalles: Repository<ExamenDetalle>,
  ) {}

  // Catálogo completo (198 exámenes, ver seed 004); el frontend los agrupa
  // por categoria.nombre para el selector de orden de laboratorio.
  listar(): Promise<ExamenCatalogo[]> {
    return this.examenes.find({
      order: { categoria: { id: 'ASC' }, nombre: 'ASC' },
    });
  }

  /**
   * Completa o corrige precios, muestra, tubo, condición y tiempo de entrega de
   * un examen. Si el examen aún no tiene fila en examen_detalles, la crea.
   */
  async actualizarDetalle(examenId: string, dto: ActualizarDetalleExamenDto) {
    if (!(await this.examenes.exists({ where: { id: examenId } }))) {
      throw new NotFoundException(`No existe el examen ${examenId}`);
    }

    const detalle =
      (await this.detalles.findOne({ where: { examenId } })) ??
      this.detalles.create({ examenId });

    const texto = (valor: string | null) => (valor?.trim() ? valor.trim() : null) as string;
    if (dto.precioPublico !== undefined) detalle.precioPublico = dto.precioPublico as number;
    if (dto.precioCorporativo !== undefined) detalle.precioCorporativo = dto.precioCorporativo as number;
    if (dto.muestra !== undefined) detalle.muestra = texto(dto.muestra);
    if (dto.tubo !== undefined) detalle.tubo = texto(dto.tubo);
    if (dto.condicion !== undefined) detalle.condicion = texto(dto.condicion);
    if (dto.tiempo !== undefined) detalle.tiempo = texto(dto.tiempo);

    const guardado = await this.detalles.save(detalle);
    // numeric de Postgres vuelve como texto: se devuelve como número (o null).
    const numero = (v: number | string | null) => (v === null || v === undefined ? null : Number(v));
    return {
      examen_id: examenId,
      precio_publico: numero(guardado.precioPublico),
      precio_corporativo: numero(guardado.precioCorporativo),
      muestra: guardado.muestra ?? null,
      tubo: guardado.tubo ?? null,
      condicion: guardado.condicion ?? null,
      tiempo: guardado.tiempo ?? null,
    };
  }
}
