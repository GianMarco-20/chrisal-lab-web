import { BadRequestException } from '@nestjs/common';
import type { DataSource } from 'typeorm';
import { DashboardService } from './dashboard.service';

// Hoy (Lima) simulado: 2026-11-17, así el rango por defecto es 2026-10-19 → 2026-11-17.
const HOY = { hoy: '2026-11-17', inicio: '2026-10-19' };

function crearServicio(dias = 29) {
  const query = jest.fn((sql: string, _params?: unknown[]) => {
    if (sql.includes("AS hoy")) return Promise.resolve([HOY]);
    if (sql.includes('AS dias')) return Promise.resolve([{ dias }]);
    // El resto son las consultas de datos: no importan en estas pruebas.
    if (sql.includes('AS citas_atendidas')) {
      return Promise.resolve([
        {
          citas: '5',
          citas_atendidas: '2',
          citas_canceladas: '1',
          ordenes: '4',
          ordenes_anuladas: '0',
          examenes: '9',
          pacientes: '7',
        },
      ]);
    }
    if (sql.includes('COUNT(*) AS total') && sql.includes('IS NULL')) {
      return Promise.resolve([{ total: '3' }]);
    }
    return Promise.resolve([]);
  });
  const servicio = new DashboardService({ query } as unknown as DataSource);
  return { servicio, query };
}

describe('DashboardService', () => {
  it('sin fechas usa los últimos 30 días hasta hoy (Lima)', async () => {
    const { servicio } = crearServicio();

    const datos = await servicio.obtener({});

    expect(datos.rango).toEqual({ desde: '2026-10-19', hasta: '2026-11-17' });
  });

  it('respeta las fechas recibidas y convierte los totales a número', async () => {
    const { servicio, query } = crearServicio(9);

    const datos = await servicio.obtener({ desde: '2026-11-01', hasta: '2026-11-10' });

    expect(datos.rango).toEqual({ desde: '2026-11-01', hasta: '2026-11-10' });
    expect(datos.resumen).toEqual({
      citas: 5,
      citasAtendidas: 2,
      citasCanceladas: 1,
      ordenes: 4,
      ordenesAnuladas: 0,
      examenes: 9,
      pacientes: 7,
    });
    expect(datos.citasSinRegistrar).toBe(3);
    // Las consultas de datos reciben el rango como parámetros, nunca pegado al SQL.
    const consultaResumen = query.mock.calls.find(([sql]) =>
      (sql as string).includes('AS citas_atendidas'),
    );
    expect(consultaResumen?.[1]).toEqual(['2026-11-01', '2026-11-10']);
  });

  it('rechaza fechas con formato inválido', async () => {
    const { servicio } = crearServicio();

    await expect(servicio.obtener({ desde: '01/11/2026' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    await expect(servicio.obtener({ hasta: "2026-11-01'; DROP TABLE citas;--" })).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('rechaza un rango invertido', async () => {
    const { servicio } = crearServicio(-3);

    await expect(
      servicio.obtener({ desde: '2026-11-10', hasta: '2026-11-07' }),
    ).rejects.toThrow('"desde" no puede ser posterior a "hasta"');
  });

  it('rechaza un rango mayor a 366 días', async () => {
    const { servicio } = crearServicio(400);

    await expect(
      servicio.obtener({ desde: '2025-01-01', hasta: '2026-02-05' }),
    ).rejects.toThrow('no puede superar 366 días');
  });
});
