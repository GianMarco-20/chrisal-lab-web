import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import type { JwtPayload } from '../auth/jwt-auth.guard';
import { PacientesService } from '../pacientes/pacientes.service';
import { EstadoLab } from './estado-lab.entity';
import { ExamenCatalogo, OrdenExamen } from './orden-examen.entity';
import { OrdenLaboratorio } from './orden-laboratorio.entity';
import { ResultadoOrden } from './resultado-orden.entity';
import {
  AnularOrdenDto,
  CrearOrdenLaboratorioDto,
  RegistrarResultadoDto,
} from './dto/laboratorio.dto';

@Injectable()
export class LaboratorioService {
  constructor(
    @InjectRepository(OrdenLaboratorio)
    private readonly ordenes: Repository<OrdenLaboratorio>,
    @InjectRepository(OrdenExamen)
    private readonly ordenExamenes: Repository<OrdenExamen>,
    @InjectRepository(ResultadoOrden)
    private readonly resultados: Repository<ResultadoOrden>,
    @InjectRepository(EstadoLab)
    private readonly estados: Repository<EstadoLab>,
    @InjectRepository(ExamenCatalogo)
    private readonly examenesCatalogo: Repository<ExamenCatalogo>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly pacientes: PacientesService,
  ) {}

  // ─── LISTAR ÓRDENES ──────────────────────────────────────────────────────────

  async listar(filtros: {
    estado?: string;
    fecha?: string;
    busqueda?: string;
  }) {
    const qb = this.ordenes
      .createQueryBuilder('o')
      .leftJoinAndSelect('o.paciente', 'p')
      .leftJoinAndSelect('o.estado', 'e')
      .leftJoinAndSelect('o.usuarioMuestra', 'um')
      .leftJoinAndSelect('um.rol', 'umRol')
      .leftJoinAndSelect('o.usuarioResultado', 'ur')
      .leftJoinAndSelect('ur.rol', 'urRol')
      .where("e.ambito = 'laboratorio'");

    if (filtros.estado) {
      qb.andWhere('e.estado = :estado', { estado: filtros.estado });
    }

    if (filtros.fecha) {
      qb.andWhere(
        "DATE(o.fecha_muestra AT TIME ZONE 'America/Lima') = :fecha",
        { fecha: filtros.fecha },
      );
    }

    if (filtros.busqueda) {
      const b = `%${filtros.busqueda.trim().toUpperCase()}%`;
      qb.andWhere(
        '(p.dni ILIKE :b OR p.historia_clinica ILIKE :b OR p.nombres ILIKE :b OR p.apellidos ILIKE :b)',
        { b },
      );
    }

    return qb.orderBy('o.fecha_muestra', 'DESC').getMany();
  }

  // ─── DETALLE DE UNA ORDEN (con sus exámenes y resultados) ─────────────────

  async detalle(ordenId: number) {
    const orden = await this.ordenes.findOne({
      where: { id: ordenId },
      relations: {
        paciente: true,
        estado: true,
        usuarioMuestra: { rol: true },
        usuarioResultado: { rol: true },
        usuarioAnulacion: { rol: true },
      },
    });
    if (!orden) throw new NotFoundException('Orden de laboratorio no encontrada');

    // Obtener exámenes con sus resultados
    const examenes = await this.ordenExamenes
      .createQueryBuilder('oe')
      .leftJoinAndSelect('oe.examen', 'ex')
      .leftJoinAndMapOne(
        'oe.resultado',
        ResultadoOrden,
        'ro',
        'ro.orden_examen_id = oe.orden_examen_id',
      )
      .leftJoinAndSelect('ro.usuario', 'ru')
      .where('oe.orden_id = :id', { id: ordenId })
      .getMany();

    return { orden, examenes };
  }

  // ─── LISTAR CATEGORÍAS Y EXÁMENES (para el formulario de nueva orden) ─────

  async listarCategorias() {
    const rows = await this.dataSource.query<{
      categoria_id: number;
      categoria: string;
      categoria_padre_id: number | null;
      examen_id: number;
      examen: string;
    }[]>(`
      SELECT
        c.categoria_id,
        c.nombre AS categoria,
        c.categoria_padre_id,
        e.examen_id,
        e.nombre AS examen
      FROM categorias_examen c
      JOIN examenes_catalogo e ON e.categoria_id = c.categoria_id
      ORDER BY c.nombre, e.nombre
    `);
    return rows;
  }

  // ─── CREAR ORDEN ──────────────────────────────────────────────────────────

  async crear(
    dto: CrearOrdenLaboratorioDto,
    usuarioSesion: JwtPayload,
  ): Promise<OrdenLaboratorio> {
    // 1. Buscar o crear paciente
    const paciente = await this.pacientes.buscarOCrear(dto.paciente);

    // 2. Verificar que los exámenes existen
    const examenesEncontrados = await this.examenesCatalogo.find({
      where: { id: In(dto.examenesIds) },
    });

    if (examenesEncontrados.length !== dto.examenesIds.length) {
      throw new BadRequestException(
        'Uno o más exámenes seleccionados no existen en el catálogo',
      );
    }

    // 3. Estado inicial: "En análisis"
    const estadoEnAnalisis = await this.estados.findOne({
      where: { estado: 'En análisis', ambito: 'laboratorio' },
    });
    if (!estadoEnAnalisis) {
      throw new BadRequestException(
        'Estado "En análisis" no configurado en la base de datos',
      );
    }

    // 4. Crear la orden
    const ahora = new Date();
    const nuevaOrden = this.ordenes.create({
      paciente,
      estado: estadoEnAnalisis,
      fechaMuestra: ahora,
      usuarioMuestra: { id: Number(usuarioSesion.sub) } as any,
    });
    const orden = await this.ordenes.save(nuevaOrden);

    // 5. Crear los exámenes asociados a la orden
    const itemsExamen = dto.examenesIds.map((examenId) =>
      this.ordenExamenes.create({
        orden: { id: orden.id } as any,
        ordenId: orden.id,
        examen: { id: examenId } as any,
        estado: 'pendiente',
      }),
    );
    await this.ordenExamenes.save(itemsExamen);

    // Devolver la orden completa
    const ordenCompleta = await this.ordenes.findOne({
      where: { id: orden.id },
      relations: {
        paciente: true,
        estado: true,
        usuarioMuestra: { rol: true },
      },
    });
    return ordenCompleta!;
  }

  // ─── REGISTRAR RESULTADO DE UN EXAMEN ────────────────────────────────────

  async registrarResultado(
    ordenExamenId: number,
    dto: RegistrarResultadoDto,
    usuarioSesion: JwtPayload,
  ) {
    // 1. Verificar que el examen existe y pertenece a una orden de laboratorio
    const ordenExamen = await this.ordenExamenes.findOne({
      where: { id: ordenExamenId },
      relations: {
        orden: { estado: true },
        examen: true,
      },
    });
    if (!ordenExamen) {
      throw new NotFoundException('Examen de la orden no encontrado');
    }

    const estadoOrden = ordenExamen.orden.estado.estado;
    if (estadoOrden === 'Anulada') {
      throw new BadRequestException(
        'No se puede registrar resultado en una orden anulada',
      );
    }

    // "Resultado listo" permite edición (RF-LAB-09)
    // Solo bloqueamos si la orden está en estado inconsistente

    // 2. Verificar si ya tiene resultado y actualizarlo, o crear uno nuevo
    const resultadoExistente = await this.resultados.findOne({
      where: { ordenExamen: { id: ordenExamenId } },
    });

    if (resultadoExistente) {
      await this.resultados.update(resultadoExistente.id, {
        resultadoTexto: dto.resultadoTexto,
        usuario: { id: Number(usuarioSesion.sub) } as any,
      });
    } else {
      await this.resultados.save(
        this.resultados.create({
          ordenExamen: { id: ordenExamenId } as any,
          resultadoTexto: dto.resultadoTexto,
          usuario: { id: Number(usuarioSesion.sub) } as any,
        }),
      );
      // Marcar el examen como con_resultado
      await this.ordenExamenes.update(ordenExamenId, { estado: 'con_resultado' });
    }

    // 3. Actualizar el estado de la orden según resultados pendientes
    await this.actualizarEstadoOrden(
      ordenExamen.orden.id,
      Number(usuarioSesion.sub),
    );

    return this.detalle(ordenExamen.orden.id);
  }

  // ─── ANULAR ORDEN ────────────────────────────────────────────────────────

  async anular(
    ordenId: number,
    dto: AnularOrdenDto,
    usuarioSesion: JwtPayload,
  ) {
    const orden = await this.ordenes.findOne({
      where: { id: ordenId },
      relations: { estado: true },
    });
    if (!orden) throw new NotFoundException('Orden de laboratorio no encontrada');

    if (orden.estado.estado === 'Resultado listo') {
      throw new BadRequestException(
        'No se puede anular una orden con resultado listo',
      );
    }
    if (orden.estado.estado === 'Anulada') {
      throw new BadRequestException('La orden ya está anulada');
    }

    const estadoAnulada = await this.estados.findOne({
      where: { estado: 'Anulada', ambito: 'laboratorio' },
    });

    await this.ordenes.update(ordenId, {
      estado: estadoAnulada!,
      motivoAnulacion: dto.motivoAnulacion,
      usuarioAnulacion: { id: Number(usuarioSesion.sub) } as any,
      fechaAnulacion: new Date(),
    });

    return this.ordenes.findOne({
      where: { id: ordenId },
      relations: {
        paciente: true,
        estado: true,
        usuarioMuestra: { rol: true },
        usuarioAnulacion: { rol: true },
      },
    });
  }

  // ─── PRIVADO: actualizar estado de la orden ──────────────────────────────

  private async actualizarEstadoOrden(ordenId: number, usuarioId: number) {
    const totalExamenes = await this.ordenExamenes.count({
      where: { orden: { id: ordenId } },
    });
    const conResultado = await this.ordenExamenes.count({
      where: { orden: { id: ordenId }, estado: 'con_resultado' },
    });

    let nombreEstado: string;
    if (conResultado === 0) {
      nombreEstado = 'En análisis';
    } else if (conResultado < totalExamenes) {
      nombreEstado = 'Resultado parcial';
    } else {
      nombreEstado = 'Resultado listo';
    }

    const estado = await this.estados.findOne({
      where: { estado: nombreEstado, ambito: 'laboratorio' },
    });

    if (!estado) return;

    const update: Partial<OrdenLaboratorio> = { estado };

    if (nombreEstado === 'Resultado listo') {
      update.usuarioResultado = { id: usuarioId } as any;
      update.fechaResultado = new Date();
    }

    await this.ordenes.update(ordenId, update);
  }

  // ─── LISTAR ESTADOS DE LABORATORIO ───────────────────────────────────────

  async listarEstados() {
    return this.estados.find({
      where: { ambito: 'laboratorio' },
      order: { id: 'ASC' },
    });
  }
}
