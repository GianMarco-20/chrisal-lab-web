import { BadRequestException } from '@nestjs/common';
import { Paciente } from '../pacientes/paciente.entity';
import { PacientesService } from '../pacientes/pacientes.service';
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
  let citasRepo: { create: jest.Mock; save: jest.Mock; find: jest.Mock };
  let cuentasRepo: {
    findOne: jest.Mock;
    create: jest.Mock;
    save: jest.Mock;
  };
  let serviciosRepo: { createQueryBuilder: jest.Mock };
  let estadosRepo: { findOneByOrFail: jest.Mock };
  let pacientesService: { buscarOCrear: jest.Mock };
  let servicio: CitasService;

  beforeEach(() => {
    citasRepo = {
      create: jest.fn((datos) => datos),
      save: jest.fn((cita) => Promise.resolve({ id: 100, ...cita })),
      find: jest.fn(),
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
    pacientesService = { buscarOCrear: jest.fn().mockResolvedValue(PACIENTE) };

    servicio = new CitasService(
      citasRepo as unknown as import('typeorm').Repository<Cita>,
      cuentasRepo as unknown as import('typeorm').Repository<Cuenta>,
      serviciosRepo as unknown as import('typeorm').Repository<Servicio>,
      estadosRepo as unknown as import('typeorm').Repository<EstadoCita>,
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
});
