import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

const DIAS_POR_DEFECTO = 30;
const DIAS_MAXIMOS = 366;
const FORMATO_FECHA = /^\d{4}-\d{2}-\d{2}$/;

// Una cita "cancelada" y una orden "anulada" no cuentan como actividad: solo
// aparecen en su gráfico de estados y en su propio indicador.
const CITA_ACTIVA = "ec.codigo <> 'cancelada'";
const ORDEN_ACTIVA = "eo.codigo <> 'anulada'";

// Misma expresión que usa el listado de laboratorio, para que los números del
// dashboard coincidan con los de esa pantalla.
const FECHA_ORDEN = "DATE(o.fecha_muestra AT TIME ZONE 'America/Lima')";

export interface FiltrosDashboard {
  desde?: string;
  hasta?: string;
}

export interface Conteo {
  nombre: string;
  total: number;
  color?: string;
}

@Injectable()
export class DashboardService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  /**
   * Toda la información del dashboard en una sola respuesta.
   * Las citas se ubican por su fecha de cita (agenda) y las órdenes por la
   * fecha de toma de muestra; ambas dentro de [desde, hasta].
   */
  async obtener(filtros: FiltrosDashboard) {
    const { desde, hasta } = await this.resolverRango(filtros);
    const p = [desde, hasta];

    const [
      resumen,
      porDia,
      citasPorEstado,
      ordenesPorEstado,
      citasPorEspecialidad,
      citasPorHora,
      examenesTop,
      examenesPorCategoria,
      porUsuario,
      citasSinRegistrar,
    ] = await Promise.all([
      this.resumen(p),
      this.porDia(p),
      this.citasPorEstado(p),
      this.ordenesPorEstado(p),
      this.citasPorEspecialidad(p),
      this.citasPorHora(p),
      this.examenesTop(p),
      this.examenesPorCategoria(p),
      this.porUsuario(p),
      this.citasSinRegistrar(p),
    ]);

    return {
      rango: { desde, hasta },
      resumen,
      porDia,
      citasPorEstado,
      ordenesPorEstado,
      citasPorEspecialidad,
      citasPorHora,
      examenesTop,
      examenesPorCategoria,
      porUsuario,
      citasSinRegistrar,
    };
  }

  // ─── RANGO DE FECHAS ───────────────────────────────────────────────────────

  private async resolverRango({ desde, hasta }: FiltrosDashboard) {
    for (const fecha of [desde, hasta]) {
      if (fecha !== undefined && !FORMATO_FECHA.test(fecha)) {
        throw new BadRequestException('Las fechas deben tener el formato AAAA-MM-DD.');
      }
    }

    // "Hoy" según Lima, no según la zona del servidor.
    const [{ hoy, inicio }] = await this.dataSource.query<{ hoy: string; inicio: string }[]>(
      `SELECT to_char((now() AT TIME ZONE 'America/Lima')::date, 'YYYY-MM-DD') AS hoy,
              to_char((now() AT TIME ZONE 'America/Lima')::date - $1::int, 'YYYY-MM-DD') AS inicio`,
      [DIAS_POR_DEFECTO - 1],
    );

    const rango = { desde: desde ?? inicio, hasta: hasta ?? hoy };
    // Una fecha imposible (2026-02-31) la rechaza Postgres; se valida acá para
    // responder 400 en lugar de un 500.
    const [{ dias }] = await this.dataSource
      .query<{ dias: number }[]>(`SELECT ($2::date - $1::date) AS dias`, [rango.desde, rango.hasta])
      .catch(() => {
        throw new BadRequestException('Alguna de las fechas no existe.');
      });

    if (dias < 0) {
      throw new BadRequestException('"desde" no puede ser posterior a "hasta".');
    }
    if (dias + 1 > DIAS_MAXIMOS) {
      throw new BadRequestException(`El rango no puede superar ${DIAS_MAXIMOS} días.`);
    }
    return rango;
  }

  // ─── INDICADORES ───────────────────────────────────────────────────────────

  private async resumen(p: string[]) {
    const [fila] = await this.dataSource.query<Record<string, string>[]>(
      `SELECT
         (SELECT COUNT(*) FROM citas c JOIN estados ec ON ec.estado_id = c.estado_id
           WHERE c.fecha_cita BETWEEN $1 AND $2 AND ${CITA_ACTIVA}) AS citas,
         (SELECT COUNT(*) FROM citas c JOIN estados ec ON ec.estado_id = c.estado_id
           WHERE c.fecha_cita BETWEEN $1 AND $2 AND ec.codigo = 'atendida') AS citas_atendidas,
         (SELECT COUNT(*) FROM citas c JOIN estados ec ON ec.estado_id = c.estado_id
           WHERE c.fecha_cita BETWEEN $1 AND $2 AND ec.codigo = 'cancelada') AS citas_canceladas,
         (SELECT COUNT(*) FROM ordenes_laboratorio o JOIN estados eo ON eo.estado_id = o.estado_id
           WHERE ${FECHA_ORDEN} BETWEEN $1 AND $2 AND ${ORDEN_ACTIVA}) AS ordenes,
         (SELECT COUNT(*) FROM ordenes_laboratorio o JOIN estados eo ON eo.estado_id = o.estado_id
           WHERE ${FECHA_ORDEN} BETWEEN $1 AND $2 AND eo.codigo = 'anulada') AS ordenes_anuladas,
         (SELECT COUNT(*) FROM orden_examenes oe
            JOIN ordenes_laboratorio o ON o.orden_id = oe.orden_id
            JOIN estados eo ON eo.estado_id = o.estado_id
           WHERE ${FECHA_ORDEN} BETWEEN $1 AND $2 AND ${ORDEN_ACTIVA}) AS examenes,
         (SELECT COUNT(DISTINCT paciente_id) FROM (
            SELECT cu.paciente_id FROM citas c
              JOIN cuentas cu ON cu.cuenta_id = c.cuenta_id
              JOIN estados ec ON ec.estado_id = c.estado_id
             WHERE c.fecha_cita BETWEEN $1 AND $2 AND ${CITA_ACTIVA}
            UNION ALL
            SELECT cu.paciente_id FROM ordenes_laboratorio o
              JOIN cuentas cu ON cu.cuenta_id = o.cuenta_id
              JOIN estados eo ON eo.estado_id = o.estado_id
             WHERE ${FECHA_ORDEN} BETWEEN $1 AND $2 AND ${ORDEN_ACTIVA}
          ) t) AS pacientes`,
      p,
    );

    return {
      citas: Number(fila.citas),
      citasAtendidas: Number(fila.citas_atendidas),
      citasCanceladas: Number(fila.citas_canceladas),
      ordenes: Number(fila.ordenes),
      ordenesAnuladas: Number(fila.ordenes_anuladas),
      examenes: Number(fila.examenes),
      pacientes: Number(fila.pacientes),
    };
  }

  /** Citas y órdenes por día; los días sin movimiento salen en 0 para que la línea no se corte. */
  private async porDia(p: string[]) {
    const filas = await this.dataSource.query<{ fecha: string; citas: number; ordenes: number }[]>(
      `SELECT to_char(d.dia, 'YYYY-MM-DD') AS fecha,
              COALESCE(ci.n, 0)::int AS citas,
              COALESCE(oo.n, 0)::int AS ordenes
         FROM generate_series($1::date, $2::date, interval '1 day') AS d(dia)
         LEFT JOIN (
           SELECT c.fecha_cita AS dia, COUNT(*) AS n
             FROM citas c JOIN estados ec ON ec.estado_id = c.estado_id
            WHERE ${CITA_ACTIVA} GROUP BY 1
         ) ci ON ci.dia = d.dia::date
         LEFT JOIN (
           SELECT ${FECHA_ORDEN} AS dia, COUNT(*) AS n
             FROM ordenes_laboratorio o JOIN estados eo ON eo.estado_id = o.estado_id
            WHERE ${ORDEN_ACTIVA} GROUP BY 1
         ) oo ON oo.dia = d.dia::date
        ORDER BY d.dia`,
      p,
    );
    return filas;
  }

  // ─── DISTRIBUCIONES ────────────────────────────────────────────────────────

  private citasPorEstado(p: string[]) {
    return this.conteos(
      `SELECT ec.nombre, ec.color, COUNT(*) AS total
         FROM citas c JOIN estados ec ON ec.estado_id = c.estado_id
        WHERE c.fecha_cita BETWEEN $1 AND $2
        GROUP BY ec.nombre, ec.color, ec.orden ORDER BY ec.orden`,
      p,
    );
  }

  private ordenesPorEstado(p: string[]) {
    return this.conteos(
      `SELECT eo.nombre, eo.color, COUNT(*) AS total
         FROM ordenes_laboratorio o JOIN estados eo ON eo.estado_id = o.estado_id
        WHERE ${FECHA_ORDEN} BETWEEN $1 AND $2
        GROUP BY eo.nombre, eo.color, eo.orden ORDER BY eo.orden`,
      p,
    );
  }

  private citasPorEspecialidad(p: string[]) {
    return this.conteos(
      `SELECT s.nombre, COUNT(*) AS total
         FROM citas c
         JOIN servicios s ON s.servicio_id = c.servicio_id
         JOIN estados ec ON ec.estado_id = c.estado_id
        WHERE c.fecha_cita BETWEEN $1 AND $2 AND ${CITA_ACTIVA}
        GROUP BY s.nombre ORDER BY total DESC, s.nombre`,
      p,
    );
  }

  /** Citas por hora de inicio (08:00, 09:00, ...): muestra en qué horarios hay más demanda. */
  private citasPorHora(p: string[]) {
    return this.conteos(
      `SELECT substr(c.hora_inicio::text, 1, 2) || ':00' AS nombre,
              COUNT(*) AS total
         FROM citas c JOIN estados ec ON ec.estado_id = c.estado_id
        WHERE c.fecha_cita BETWEEN $1 AND $2 AND ${CITA_ACTIVA}
        GROUP BY 1 ORDER BY 1`,
      p,
    );
  }

  private examenesTop(p: string[]) {
    return this.conteos(
      `SELECT ex.nombre, COUNT(*) AS total
         FROM orden_examenes oe
         JOIN ordenes_laboratorio o ON o.orden_id = oe.orden_id
         JOIN estados eo ON eo.estado_id = o.estado_id
         JOIN examenes_catalogo ex ON ex.examen_id = oe.examen_id
        WHERE ${FECHA_ORDEN} BETWEEN $1 AND $2 AND ${ORDEN_ACTIVA}
        GROUP BY ex.examen_id, ex.nombre ORDER BY total DESC, ex.nombre LIMIT 10`,
      p,
    );
  }

  private examenesPorCategoria(p: string[]) {
    return this.conteos(
      `SELECT cat.nombre, COUNT(*) AS total
         FROM orden_examenes oe
         JOIN ordenes_laboratorio o ON o.orden_id = oe.orden_id
         JOIN estados eo ON eo.estado_id = o.estado_id
         JOIN examenes_catalogo ex ON ex.examen_id = oe.examen_id
         JOIN categorias_examen cat ON cat.categoria_id = ex.categoria_id
        WHERE ${FECHA_ORDEN} BETWEEN $1 AND $2 AND ${ORDEN_ACTIVA}
        GROUP BY cat.nombre ORDER BY total DESC, cat.nombre`,
      p,
    );
  }

  // ─── ACTIVIDAD POR USUARIO ─────────────────────────────────────────────────

  /**
   * Cuántas citas, órdenes y exámenes registró cada usuario en el rango.
   * Salen todas las recepcionistas y usuarios de laboratorio activos (aunque
   * tengan 0, para ver quién no registró nada) y cualquier otro usuario con
   * actividad; el más activo primero.
   */
  private async porUsuario(p: string[]) {
    const filas = await this.dataSource.query<
      {
        usuario_id: number;
        nombres: string;
        apellidos: string;
        nombre_usuario: string;
        rol: string;
        citas: string;
        ordenes: string;
        examenes: string;
      }[]
    >(
      `SELECT u.usuario_id, u.nombres, u.apellidos, u.nombre_usuario, r.nombre AS rol,
              COALESCE(ci.n, 0) AS citas,
              COALESCE(oo.n, 0) AS ordenes,
              COALESCE(ex.n, 0) AS examenes
         FROM usuarios u
         JOIN roles r ON r.rol_id = u.rol_id
         LEFT JOIN (
           SELECT c.usuario_registro_id AS uid, COUNT(*) AS n
             FROM citas c JOIN estados ec ON ec.estado_id = c.estado_id
            WHERE c.fecha_cita BETWEEN $1 AND $2 AND ${CITA_ACTIVA}
              AND c.usuario_registro_id IS NOT NULL
            GROUP BY 1
         ) ci ON ci.uid = u.usuario_id
         LEFT JOIN (
           SELECT o.usuario_muestra_id AS uid, COUNT(*) AS n
             FROM ordenes_laboratorio o JOIN estados eo ON eo.estado_id = o.estado_id
            WHERE ${FECHA_ORDEN} BETWEEN $1 AND $2 AND ${ORDEN_ACTIVA}
            GROUP BY 1
         ) oo ON oo.uid = u.usuario_id
         LEFT JOIN (
           SELECT o.usuario_muestra_id AS uid, COUNT(*) AS n
             FROM orden_examenes oe
             JOIN ordenes_laboratorio o ON o.orden_id = oe.orden_id
             JOIN estados eo ON eo.estado_id = o.estado_id
            WHERE ${FECHA_ORDEN} BETWEEN $1 AND $2 AND ${ORDEN_ACTIVA}
            GROUP BY 1
         ) ex ON ex.uid = u.usuario_id
        WHERE (u.activo AND r.nombre IN ('recepcion', 'laboratorio'))
           OR COALESCE(ci.n, 0) + COALESCE(oo.n, 0) > 0
        ORDER BY COALESCE(ci.n, 0) + COALESCE(oo.n, 0) DESC, u.apellidos, u.nombres`,
      p,
    );

    return filas.map((f) => ({
      usuarioId: f.usuario_id,
      nombre: `${f.nombres} ${f.apellidos}`.trim(),
      nombreUsuario: f.nombre_usuario,
      rol: f.rol,
      citas: Number(f.citas),
      ordenes: Number(f.ordenes),
      examenes: Number(f.examenes),
    }));
  }

  /** Citas del rango creadas antes de la migración 008, de las que no se sabe quién las registró. */
  private async citasSinRegistrar(p: string[]) {
    const [{ total }] = await this.dataSource.query<{ total: string }[]>(
      `SELECT COUNT(*) AS total
         FROM citas c JOIN estados ec ON ec.estado_id = c.estado_id
        WHERE c.fecha_cita BETWEEN $1 AND $2 AND ${CITA_ACTIVA}
          AND c.usuario_registro_id IS NULL`,
      p,
    );
    return Number(total);
  }

  private async conteos(sql: string, p: string[]): Promise<Conteo[]> {
    const filas = await this.dataSource.query<{ nombre: string; total: string; color?: string }[]>(
      sql,
      p,
    );
    return filas.map((f) => ({
      nombre: f.nombre,
      total: Number(f.total),
      ...(f.color ? { color: f.color } : {}),
    }));
  }
}
