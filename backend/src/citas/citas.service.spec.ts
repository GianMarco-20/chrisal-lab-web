import { BadRequestException, ConflictException } from '@nestjs/common';
import { Paciente } from '../pacientes/paciente.entity';
import { PacientesService } from '../pacientes/pacientes.service';
import { ProgramacionMedica } from '../programacion-medica/programacion-medica.entity';
import { Cita } from './cita.entity';
import { CitasService } from './citas.service';
import { Cuenta } from './cuenta.entity';
import { EstadoCita } from './estado-cita.entity';
import { Servicio } from './servicio.entity';

const PACIENTE: Paciente = {
  historiaClinica: 'HC-000001',
  dni: '74852136',
  nombres: 'Juan',
  apellidos: 'Pérez García',
  sexo: 'M',
  celular: '999999999',
  fechaRegistro: new Date(),
};

const SERVICIO: Servicio = { id: 1, nombre: 'Medicina General', tipo: 'consultorio' };

const CUENTA: Cuenta = { id: 10, paciente: PACIENTE, fechaApertura: new Date() };

const ESTADO_PENDIENTE_TRIAJE: EstadoCita = {
  id: 1,
  codigo: 'pendiente_triaje',
  nombre: 'Pendiente de Triaje',
  descripcion: 'Recepción registra los signos vitales',
  color: 'amber',
  orden: 1,
};

const ESTADO_AUSENTE: EstadoCita = {
  id: 4,
  codigo: 'ausente',
  nombre: 'Ausente',
  descripcion: 'El paciente no llegó a la cita',
  color: 'red',
  orden: 4,
};

const ESTADO_ATENDIDA: EstadoCita = {
  id: 3,
  codigo: 'atendida',
  nombre: 'Atendida',
  descripcion: 'La cita ya fue atendida',
  color: 'blue',
  orden: 3,
};

const ESTADO_CANCELADA: EstadoCita = {
  id: 5,
  codigo: 'cancelada',
  nombre: 'Cancelada',
  descripcion: 'La cita fue cancelada antes de la atención',
  color: 'gray',
  orden: 5,
};

function crearDto() {
  return {
    paciente: {
      dni: '74852136',
      nombres: 'Juan',
      apellidos: 'Pérez García',
      sexo: 'M',
      celular: '999999999',
    },
    especialidad: 'Medicina General',
    fecha: '2026-10-01',
    hora: '08:30',
  };
}

describe('CitasService', () => {
  let citasRepo: {
    create: jest.Mock;
    save: jest.Mock;
    find: jest.Mock;
    findOneBy: jest.Mock;
    findOneByOrFail: jest.Mock;
  };
  let cuentasRepo: {
    findOne: jest.Mock;
    create: jest.Mock;
    save: jest.Mock;
  };
  let serviciosRepo: { createQueryBuilder: jest.Mock };
  let estadosRepo: { findOneByOrFail: jest.Mock };
  let programacionesRepo: { findOneBy: jest.Mock };
  let pacientesService: { buscarOCrear: jest.Mock };
  let servicio: CitasService;

  beforeEach(() => {
    citasRepo = {
      create: jest.fn((datos) => datos),
      save: jest.fn((cita) => Promise.resolve({ id: 100, ...cita })),
      // Simula el re-fetch que hace crear() después de guardar: devuelve lo
      // último guardado (igual que haría una consulta real en este mock).
      findOneByOrFail: jest.fn((where: { id: number }) =>
        Promise.resolve(citasRepo.save.mock.results.at(-1)?.value ?? { id: where.id }),
      ),
      find: jest.fn(),
      findOneBy: jest.fn(),
    };
    cuentasRepo = {
      findOne: jest.fn(),
      create: jest.fn((datos) => datos),
      save: jest.fn((cuenta) => Promise.resolve({ id: 10, ...cuenta })),
    };
    const queryBuilder = {
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn(),
    };
    serviciosRepo = { createQueryBuilder: jest.fn(() => queryBuilder) };
    estadosRepo = { findOneByOrFail: jest.fn().mockResolvedValue(ESTADO_PENDIENTE_TRIAJE) };
    programacionesRepo = { findOneBy: jest.fn() };
    pacientesService = { buscarOCrear: jest.fn().mockResolvedValue(PACIENTE) };

    servicio = new CitasService(
      citasRepo as unknown as import('typeorm').Repository<Cita>,
      cuentasRepo as unknown as import('typeorm').Repository<Cuenta>,
      serviciosRepo as unknown as import('typeorm').Repository<Servicio>,
      estadosRepo as unknown as import('typeorm').Repository<EstadoCita>,
      programacionesRepo as unknown as import('typeorm').Repository<ProgramacionMedica>,
      pacientesService as unknown as PacientesService,
    );
    (serviciosRepo.createQueryBuilder() as { getOne: jest.Mock }).getOne.mockResolvedValue(
      SERVICIO,
    );
  });

  it('reutiliza la cuenta más reciente si el paciente ya tiene una', async () => {
    cuentasRepo.findOne.mockResolvedValue(CUENTA);

    const cita = await servicio.crear(crearDto());

    expect(cuentasRepo.save).not.toHaveBeenCalled();
    expect(cita).toMatchObject({ cuenta: CUENTA, servicio: SERVICIO });
  });

  it('toda cita nueva arranca en "Pendiente de Triaje"', async () => {
    cuentasRepo.findOne.mockResolvedValue(CUENTA);

    const cita = await servicio.crear(crearDto());

    expect(estadosRepo.findOneByOrFail).toHaveBeenCalledWith({ codigo: 'pendiente_triaje' });
    expect(cita).toMatchObject({ estado: ESTADO_PENDIENTE_TRIAJE });
  });

  it('abre una cuenta nueva si el paciente no tiene ninguna', async () => {
    cuentasRepo.findOne.mockResolvedValue(null);

    await servicio.crear(crearDto());

    // Debe guardarse el paciente completo, no solo su historiaClinica: al ser
    // una relación eager, lo que se guarda es lo mismo que devuelve la API.
    expect(cuentasRepo.save).toHaveBeenCalledWith(
      expect.objectContaining({ paciente: PACIENTE }),
    );
  });

  it('da de alta al paciente por PacientesService cuando el DNI no existe', async () => {
    cuentasRepo.findOne.mockResolvedValue(CUENTA);

    await servicio.crear(crearDto());

    expect(pacientesService.buscarOCrear).toHaveBeenCalledWith(crearDto().paciente);
  });

  it('calcula hora_fin como hora_inicio + 30 minutos', async () => {
    cuentasRepo.findOne.mockResolvedValue(CUENTA);

    const cita = await servicio.crear(crearDto());

    expect(cita).toMatchObject({ horaInicio: '08:30', horaFin: '09:00:00' });
  });

  it('cruza la medianoche correctamente (23:45 -> 00:15)', async () => {
    cuentasRepo.findOne.mockResolvedValue(CUENTA);

    const cita = await servicio.crear({ ...crearDto(), hora: '23:45' });

    expect(cita).toMatchObject({ horaFin: '00:15:00' });
  });

  it('rechaza un servicio que no existe en la tabla servicios', async () => {
    cuentasRepo.findOne.mockResolvedValue(CUENTA);
    (serviciosRepo.createQueryBuilder() as { getOne: jest.Mock }).getOne.mockResolvedValue(
      null,
    );

    await expect(
      servicio.crear({ ...crearDto(), especialidad: 'No Existe' }),
    ).rejects.toThrow(BadRequestException);
    expect(citasRepo.save).not.toHaveBeenCalled();
  });

  describe('crear con programacionId', () => {
    const PROGRAMACION = {
      id: 7,
      fecha: '2026-10-01',
      horaInicio: '08:00:00',
      horaFin: '12:00:00',
    };

    it('asigna la cita al horario programado si la hora cae dentro del turno', async () => {
      cuentasRepo.findOne.mockResolvedValue(CUENTA);
      programacionesRepo.findOneBy.mockResolvedValue(PROGRAMACION);

      const cita = await servicio.crear({ ...crearDto(), programacionId: 7 });

      expect(programacionesRepo.findOneBy).toHaveBeenCalledWith({ id: 7 });
      expect(cita).toMatchObject({ programacionId: 7 });
    });

    it('sin programacionId, la cita queda sin asignar', async () => {
      cuentasRepo.findOne.mockResolvedValue(CUENTA);

      const cita = await servicio.crear(crearDto());

      expect(programacionesRepo.findOneBy).not.toHaveBeenCalled();
      expect(cita).toMatchObject({ programacionId: null });
    });

    it('rechaza un horario programado que no existe', async () => {
      cuentasRepo.findOne.mockResolvedValue(CUENTA);
      programacionesRepo.findOneBy.mockResolvedValue(null);

      await expect(
        servicio.crear({ ...crearDto(), programacionId: 999 }),
      ).rejects.toThrow(BadRequestException);
      expect(citasRepo.save).not.toHaveBeenCalled();
    });

    it('rechaza si la fecha de la cita no coincide con la del horario programado', async () => {
      cuentasRepo.findOne.mockResolvedValue(CUENTA);
      programacionesRepo.findOneBy.mockResolvedValue(PROGRAMACION);

      await expect(
        servicio.crear({ ...crearDto(), fecha: '2026-10-02', programacionId: 7 }),
      ).rejects.toThrow(BadRequestException);
      expect(citasRepo.save).not.toHaveBeenCalled();
    });

    it('rechaza si la hora cae fuera del turno del horario programado', async () => {
      cuentasRepo.findOne.mockResolvedValue(CUENTA);
      programacionesRepo.findOneBy.mockResolvedValue(PROGRAMACION);

      await expect(
        servicio.crear({ ...crearDto(), hora: '14:00', programacionId: 7 }),
      ).rejects.toThrow(BadRequestException);
      expect(citasRepo.save).not.toHaveBeenCalled();
    });
  });

  describe('cancelar', () => {
    it('cancela una cita pendiente de triaje', async () => {
      citasRepo.findOneBy.mockResolvedValue({ id: 5, estado: ESTADO_PENDIENTE_TRIAJE });
      estadosRepo.findOneByOrFail.mockResolvedValue(ESTADO_CANCELADA);

      const cita = await servicio.cancelar(5);

      expect(estadosRepo.findOneByOrFail).toHaveBeenCalledWith({ codigo: 'cancelada' });
      expect(cita).toMatchObject({ estado: ESTADO_CANCELADA });
    });

    it('cancela una cita ausente', async () => {
      citasRepo.findOneBy.mockResolvedValue({ id: 5, estado: ESTADO_AUSENTE });
      estadosRepo.findOneByOrFail.mockResolvedValue(ESTADO_CANCELADA);

      const cita = await servicio.cancelar(5);

      expect(cita).toMatchObject({ estado: ESTADO_CANCELADA });
    });

    it('rechaza cancelar una cita ya atendida', async () => {
      citasRepo.findOneBy.mockResolvedValue({ id: 5, estado: ESTADO_ATENDIDA });

      await expect(servicio.cancelar(5)).rejects.toThrow(ConflictException);
      expect(citasRepo.save).not.toHaveBeenCalled();
    });

    it('rechaza una cita que no existe', async () => {
      citasRepo.findOneBy.mockResolvedValue(null);

      await expect(servicio.cancelar(999)).rejects.toThrow(BadRequestException);
    });
  });

  describe('reprogramar', () => {
    const PROGRAMACION = {
      id: 7,
      fecha: '2026-11-01',
      horaInicio: '08:00:00',
      horaFin: '12:00:00',
    };

    it('cambia fecha/hora/médico y vuelve a pendiente_triaje si hay un horario programado', async () => {
      citasRepo.findOneBy.mockResolvedValue({ id: 5, estado: ESTADO_AUSENTE });
      estadosRepo.findOneByOrFail.mockResolvedValue(ESTADO_PENDIENTE_TRIAJE);
      programacionesRepo.findOneBy.mockResolvedValue(PROGRAMACION);

      const cita = await servicio.reprogramar(5, {
        fecha: '2026-11-01',
        hora: '10:00',
        programacionId: 7,
      });

      expect(programacionesRepo.findOneBy).toHaveBeenCalledWith({ id: 7 });
      expect(estadosRepo.findOneByOrFail).toHaveBeenCalledWith({ codigo: 'pendiente_triaje' });
      expect(cita).toMatchObject({
        fechaCita: '2026-11-01',
        horaInicio: '10:00',
        horaFin: '10:30:00',
        programacionId: 7,
        estado: ESTADO_PENDIENTE_TRIAJE,
      });
    });

    it('rechaza reprogramar si no hay ningún médico programado para esa fecha/hora', async () => {
      citasRepo.findOneBy.mockResolvedValue({ id: 5, estado: ESTADO_AUSENTE });
      programacionesRepo.findOneBy.mockResolvedValue(null);

      await expect(
        servicio.reprogramar(5, { fecha: '2026-11-01', hora: '10:00', programacionId: 999 }),
      ).rejects.toThrow(BadRequestException);
      expect(citasRepo.save).not.toHaveBeenCalled();
    });

    it('rechaza si la hora elegida cae fuera del turno del horario programado', async () => {
      citasRepo.findOneBy.mockResolvedValue({ id: 5, estado: ESTADO_AUSENTE });
      programacionesRepo.findOneBy.mockResolvedValue(PROGRAMACION);

      await expect(
        servicio.reprogramar(5, { fecha: '2026-11-01', hora: '14:00', programacionId: 7 }),
      ).rejects.toThrow(BadRequestException);
      expect(citasRepo.save).not.toHaveBeenCalled();
    });

    it('rechaza reprogramar una cita cancelada', async () => {
      citasRepo.findOneBy.mockResolvedValue({ id: 5, estado: ESTADO_CANCELADA });

      await expect(
        servicio.reprogramar(5, { fecha: '2026-11-01', hora: '10:00', programacionId: 7 }),
      ).rejects.toThrow(ConflictException);
      expect(citasRepo.save).not.toHaveBeenCalled();
    });
  });
});
