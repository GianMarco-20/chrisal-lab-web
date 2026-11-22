import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ActualizarPaqueteLaboratorioDto } from './dto/actualizar-paquete-laboratorio.dto';
import { ActualizarDetalleExamenDto } from './dto/actualizar-detalle-examen.dto';
import { ExamenCatalogo } from './examen-catalogo.entity';
import { ExamenDetalle } from './examen-detalle.entity';
import { PaqueteLaboratorio } from './paquete-laboratorio.entity';

@Injectable()
export class ExamenesService {
  constructor(
    @InjectRepository(ExamenCatalogo) private readonly examenes: Repository<ExamenCatalogo>,
    @InjectRepository(ExamenDetalle) private readonly detalles: Repository<ExamenDetalle>,
    @InjectRepository(PaqueteLaboratorio)
    private readonly paquetes: Repository<PaqueteLaboratorio>,
  ) {}

  // Catálogo completo (198 exámenes, ver seed 004); el frontend los agrupa
  // por categoria.nombre para el selector de orden de laboratorio.
  listar(): Promise<ExamenCatalogo[]> {
    return this.examenes.find({
      order: { categoria: { id: 'ASC' }, nombre: 'ASC' },
    });
  }

  async listarPaquetes() {
    const paquetes = await this.paquetes.find({ order: { nombre: 'ASC' } });
    return paquetes.map((paquete) => ({
      id: paquete.id,
      nombre: paquete.nombre,
      precio: Number(paquete.precio),
      examenes: paquete.examenes
        .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
        .map((examen) => ({
          categoria_id: examen.categoria.id,
          categoria: examen.categoria.nombre,
          examen_id: examen.id,
          examen: examen.nombre,
          precio_publico: examen.detalle?.precioPublico ?? null,
          precio_corporativo: examen.detalle?.precioCorporativo ?? null,
          muestra: examen.detalle?.muestra ?? null,
          tubo: examen.detalle?.tubo ?? null,
          condicion: examen.detalle?.condicion ?? null,
          tiempo: examen.detalle?.tiempo ?? null,
        })),
    }));
  }

  async actualizarPaquete(id: string, dto: ActualizarPaqueteLaboratorioDto) {
    const paquete = await this.paquetes.findOne({ where: { id } });
    if (!paquete) {
      throw new NotFoundException(`No existe el paquete ${id}`);
    }

    const examenes = await this.examenes.find({ where: { id: In(dto.examenesIds) } });
    if (examenes.length !== dto.examenesIds.length) {
      throw new BadRequestException('Uno o más exámenes seleccionados no existen en el catálogo');
    }

    paquete.precio = dto.precio;
    paquete.examenes = examenes;
    await this.paquetes.save(paquete);
    return (await this.listarPaquetes()).find((item) => item.id === id);
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
