import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import type { JwtPayload } from '../auth/jwt-auth.guard';
import { Cuenta } from '../citas/cuenta.entity';
import { ExamenParametro } from '../examenes/examen-parametro.entity';
import { PacientesService } from '../pacientes/pacientes.service';
import { EstadoLab } from './estado-lab.entity';
import { ExamenCatalogo, OrdenExamen } from './orden-examen.entity';
import { OrdenLaboratorio } from './orden-laboratorio.entity';
import { ResultadoOrden } from './resultado-orden.entity';
import { ResultadoValor } from './resultado-valor.entity';
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
    @InjectRepository(ResultadoValor)
    private readonly valores: Repository<ResultadoValor>,
    @InjectRepository(ExamenParametro)
    private readonly parametros: Repository<ExamenParametro>,
    @InjectRepository(EstadoLab)
    private readonly estados: Repository<EstadoLab>,
    @InjectRepository(ExamenCatalogo)
    private readonly examenesCatalogo: Repository<ExamenCatalogo>,
    @InjectRepository(Cuenta)
    private readonly cuentas: Repository<Cuenta>,
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
      .leftJoinAndSelect('o.cuenta', 'c')
      .leftJoinAndSelect('c.paciente', 'p')
      .leftJoinAndSelect('o.estado', 'e')
      .leftJoinAndSelect('o.usuarioMuestra', 'um')
      .leftJoinAndSelect('um.rol', 'umRol')
      .leftJoinAndSelect('o.usuarioResultado', 'ur')
      .leftJoinAndSelect('ur.rol', 'urRol')
      .where("e.ambito = 'laboratorio'");

    if (filtros.estado) {
      qb.andWhere('(e.nombre = :estado OR e.codigo = :estado)', { estado: filtros.estado });
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
        cuenta: { paciente: true },
        estado: true,
        usuarioMuestra: { rol: true },
        usuarioResultado: { rol: true },
        usuarioAnulacion: { rol: true },
      },
    });
    if (!orden) throw new NotFoundException('Orden de laboratorio no encontrada');

    // Obtener exámenes con sus resultados y detalles
    const examenes = await this.ordenExamenes
      .createQueryBuilder('oe')
      .leftJoinAndSelect('oe.examen', 'ex')
      .leftJoinAndSelect('ex.detalle', 'ed')
      .leftJoinAndSelect('ex.parametros', 'ep')
      .leftJoinAndMapOne(
        'oe.resultado',
        ResultadoOrden,
        'ro',
        'ro.orden_examen_id = oe.orden_examen_id',
      )
      .leftJoinAndSelect('ro.usuario', 'ru')
      .leftJoinAndSelect('ro.valores', 'rv')
      .where('oe.orden_id = :id', { id: ordenId })
      .orderBy('oe.id', 'ASC')
      .addOrderBy('ep.orden', 'ASC')
      .addOrderBy('ep.sexo', 'ASC')
      .getMany();

    return { orden, examenes };
  }

  // ─── LISTAR CATEGORÍAS Y EXÁMENES CON DETALLES (precios, tubos, etc.) ─────

  async listarCategorias() {
    const rows = await this.dataSource.query<{
      categoria_id: number;
      categoria: string;
      examen_id: string;
      examen: string;
      precio_corporativo: number | null;
      precio_publico: number | null;
      muestra: string | null;
      tubo: string | null;
      condicion: string | null;
      tiempo: string | null;
    }[]>(`
      SELECT
        c.categoria_id,
        c.nombre AS categoria,
        e.examen_id,
        e.nombre AS examen,
        d.precio_corporativo,
        d.precio_publico,
        d.muestra,
        d.tubo,
        d.condicion,
        d.tiempo
      FROM categorias_examen c
      JOIN examenes_catalogo e ON e.categoria_id = c.categoria_id
      LEFT JOIN examen_detalles d ON d.examen_id = e.examen_id
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

    // 2. Obtener o crear cuenta del paciente
    let cuenta = await this.cuentas.findOne({
      where: { paciente: { id: paciente.id } },
      order: { fechaApertura: 'DESC' },
    });
    if (!cuenta) {
      cuenta = await this.cuentas.save(this.cuentas.create({ paciente }));
    }

    // 3. Verificar que los exámenes existen
    const examenesEncontrados = await this.examenesCatalogo.find({
      where: { id: In(dto.examenesIds) },
    });

    if (examenesEncontrados.length !== dto.examenesIds.length) {
      throw new BadRequestException(
        'Uno o más exámenes seleccionados no existen en el catálogo',
      );
    }

    // 4. Estado inicial: "En análisis"
    const estadoEnAnalisis = await this.estados.findOne({
      where: [
        { codigo: 'en_analisis', ambito: 'laboratorio' },
        { nombre: 'En análisis', ambito: 'laboratorio' },
      ],
    });
    if (!estadoEnAnalisis) {
      throw new BadRequestException(
        'Estado "En análisis" no configurado en la base de datos',
      );
    }

    // 5. Crear la orden
    const ahora = new Date();
    const nuevaOrden = this.ordenes.create({
      cuenta,
      estado: estadoEnAnalisis,
      fechaMuestra: ahora,
      usuarioMuestra: { id: Number(usuarioSesion.sub) } as any,
    });
    const orden = await this.ordenes.save(nuevaOrden);

    // 6. Crear los exámenes asociados a la orden
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
        cuenta: { paciente: true },
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

    const estadoNombre = ordenExamen.orden.estado.nombre;
    const estadoCodigo = ordenExamen.orden.estado.codigo;
    if (estadoNombre === 'Anulada' || estadoCodigo === 'anulada') {
      throw new BadRequestException(
        'No se puede registrar resultado en una orden anulada',
      );
    }

    const resultadoExistente = await this.resultados.findOne({
      where: { ordenExamen: { id: ordenExamenId } },
    });

    let resultadoId: number;
    if (resultadoExistente) {
      resultadoId = resultadoExistente.id;
      await this.resultados.update(resultadoId, {
        resultadoTexto: dto.resultadoTexto,
        usuario: { id: Number(usuarioSesion.sub) } as any,
      });
    } else {
      const nuevo = await this.resultados.save(
        this.resultados.create({
          ordenExamen: { id: ordenExamenId } as any,
          resultadoTexto: dto.resultadoTexto,
          usuario: { id: Number(usuarioSesion.sub) } as any,
        }),
      );
      resultadoId = nuevo.id;
      await this.ordenExamenes.update(ordenExamenId, { estado: 'con_resultado' });
    }

    await this.guardarValores(resultadoId, ordenExamen.examen.id, dto.resultadoTexto);

    await this.actualizarEstadoOrden(
      ordenExamen.orden.id,
      Number(usuarioSesion.sub),
    );

    return this.detalle(ordenExamen.orden.id);
  }

  /**
   * Desglosa el resultado en resultado_valores: una fila por campo del examen
   * (examen_parametros). El formato del frontend guarda un JSON como
   * {"lipasa":"40","amilasa":"80"}; cada clave que coincide con un campo del
   * examen se guarda aparte, con su valor numérico cuando lo es. Un resultado
   * de texto libre o de un examen sin campos definidos no genera filas.
   * Al editar, se reemplazan todas las filas anteriores.
   */
  private async guardarValores(resultadoId: number, examenId: string, resultadoTexto: string) {
    await this.valores.delete({ resultado: { id: resultadoId } });

    let dato: unknown;
    try {
      dato = JSON.parse(resultadoTexto);
    } catch {
      return;
    }
    if (!dato || typeof dato !== 'object' || Array.isArray(dato)) return;

    const claves = new Set(
      (await this.parametros.find({ where: { examen: { id: examenId } } })).map((p) => p.clave),
    );
    const filas = Object.entries(dato as Record<string, unknown>)
      .filter(([clave, valor]) => claves.has(clave) && typeof valor === 'string' && valor.trim() !== '')
      .map(([clave, valor]) => {
        const texto = (valor as string).trim();
        const numero = Number(texto.replace(',', '.'));
        return this.valores.create({
          resultado: { id: resultadoId } as ResultadoOrden,
          clave,
          valorTexto: texto,
          valorNumero: Number.isFinite(numero) ? numero : null,
        });
      });

    if (filas.length > 0) {
      await this.valores.save(filas);
    }
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

    if (orden.estado.nombre === 'Resultado listo' || orden.estado.codigo === 'resultado_listo') {
      throw new BadRequestException(
        'No se puede anular una orden con resultado listo',
      );
    }
    if (orden.estado.nombre === 'Anulada' || orden.estado.codigo === 'anulada') {
      throw new BadRequestException('La orden ya está anulada');
    }

    const estadoAnulada = await this.estados.findOne({
      where: [
        { codigo: 'anulada', ambito: 'laboratorio' },
        { nombre: 'Anulada', ambito: 'laboratorio' },
      ],
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
        cuenta: { paciente: true },
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

    let codigoEstado: string;
    if (conResultado === 0) {
      codigoEstado = 'en_analisis';
    } else if (conResultado < totalExamenes) {
      codigoEstado = 'resultado_parcial';
    } else {
      codigoEstado = 'resultado_listo';
    }

    const estado = await this.estados.findOne({
      where: { codigo: codigoEstado, ambito: 'laboratorio' },
    });

    if (!estado) return;

    const update: Partial<OrdenLaboratorio> = { estado };

    if (codigoEstado === 'resultado_listo') {
      update.usuarioResultado = { id: usuarioId } as any;
      update.fechaResultado = new Date();
    }

    await this.ordenes.update(ordenId, update);
  }

  // ─── LISTAR ESTADOS DE LABORATORIO ───────────────────────────────────────

  async listarEstados() {
    return this.estados.find({
      where: { ambito: 'laboratorio' },
      order: { orden: 'ASC' },
    });
  }
}
