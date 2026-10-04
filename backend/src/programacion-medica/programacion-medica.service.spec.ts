import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Consultorio } from '../consultorios/consultorio.entity';
import { Medico } from '../medicos/medico.entity';
import { ProgramacionMedica } from './programacion-medica.entity';
import { ProgramacionMedicaService } from './programacion-medica.service';

const MEDICO: Medico = {
  id: 1,
  nombres: 'Carlos',
  apellidos: 'Mendoza',
  especialidad: 'Medicina General',
  dni: '12345678',
};

const CONSULTORIO: Consultorio = { id: 1, nombre: 'Consultorio 1', ubicacion: 'Primer piso' };

function crearDto() {
  return {
    medicoId: 1,
    consultorioId: 1,
    fecha: '2026-10-10',
    turno: 'mañana' as const,
    horaInicio: '08:00',
    horaFin: '12:00',
  };
}

describe('ProgramacionMedicaService', () => {
  let programacionesRepo: {
    create: jest.Mock;
    save: jest.Mock;
    find: jest.Mock;
    findOneBy: jest.Mock;
    delete: jest.Mock;
  };
  let medicosRepo: { findOneBy: jest.Mock };
  let consultoriosRepo: { findOneBy: jest.Mock };
  let servicio: ProgramacionMedicaService;

  beforeEach(() => {
    programacionesRepo = {
      create: jest.fn((datos) => datos),
      save: jest.fn((p) => Promise.resolve({ id: 50, ...p })),
      find: jest.fn(),
      findOneBy: jest.fn(),
      delete: jest.fn(),
    };
    medicosRepo = { findOneBy: jest.fn().mockResolvedValue(MEDICO) };
    consultoriosRepo = { findOneBy: jest.fn().mockResolvedValue(CONSULTORIO) };

    servicio = new ProgramacionMedicaService(
      programacionesRepo as unknown as import('typeorm').Repository<ProgramacionMedica>,
      medicosRepo as unknown as import('typeorm').Repository<Medico>,
      consultoriosRepo as unknown as import('typeorm').Repository<Consultorio>,
    );
  });

  describe('crear', () => {
    it('crea la programación con el médico y consultorio resueltos', async () => {
      const resultado = await servicio.crear(crearDto());

      expect(resultado).toMatchObject({ medico: MEDICO, consultorio: CONSULTORIO });
      expect(medicosRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(consultoriosRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('rechaza hora_fin menor o igual a hora_inicio', async () => {
      await expect(
        servicio.crear({ ...crearDto(), horaInicio: '12:00', horaFin: '12:00' }),
      ).rejects.toThrow(BadRequestException);
      expect(programacionesRepo.save).not.toHaveBeenCalled();
    });

    it('rechaza un médico que no existe', async () => {
      medicosRepo.findOneBy.mockResolvedValue(null);

      await expect(servicio.crear(crearDto())).rejects.toThrow(BadRequestException);
    });

    it('rechaza un consultorio que no existe', async () => {
      consultoriosRepo.findOneBy.mockResolvedValue(null);

      await expect(servicio.crear(crearDto())).rejects.toThrow(BadRequestException);
    });
  });

  describe('obtener', () => {
    it('lanza NotFoundException si no existe', async () => {
      programacionesRepo.findOneBy.mockResolvedValue(null);

      await expect(servicio.obtener(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('actualizar', () => {
    it('actualiza solo los campos enviados', async () => {
      const existente = {
        id: 50,
        medico: MEDICO,
        consultorio: CONSULTORIO,
        fecha: '2026-10-10',
        turno: 'mañana' as const,
        horaInicio: '08:00',
        horaFin: '12:00',
      };
      programacionesRepo.findOneBy.mockResolvedValue(existente);

      await servicio.actualizar(50, { horaFin: '13:00' });

      expect(programacionesRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({ horaInicio: '08:00', horaFin: '13:00' }),
      );
    });

    it('rechaza que el horario actualizado quede invertido', async () => {
      programacionesRepo.findOneBy.mockResolvedValue({
        id: 50,
        medico: MEDICO,
        consultorio: CONSULTORIO,
        fecha: '2026-10-10',
        turno: 'mañana',
        horaInicio: '08:00',
        horaFin: '12:00',
      });

      await expect(servicio.actualizar(50, { horaInicio: '13:00' })).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('eliminar', () => {
    it('borra la programación si existe', async () => {
      programacionesRepo.findOneBy.mockResolvedValue({ id: 50 });

      await servicio.eliminar(50);

      expect(programacionesRepo.delete).toHaveBeenCalledWith(50);
    });

    it('convierte una violación de llave foránea en un 400 claro', async () => {
      programacionesRepo.findOneBy.mockResolvedValue({ id: 50 });
      programacionesRepo.delete.mockRejectedValue({ code: '23503' });

      await expect(servicio.eliminar(50)).rejects.toThrow(BadRequestException);
    });

    it('lanza NotFoundException si la programación no existe', async () => {
      programacionesRepo.findOneBy.mockResolvedValue(null);

      await expect(servicio.eliminar(999)).rejects.toThrow(NotFoundException);
      expect(programacionesRepo.delete).not.toHaveBeenCalled();
    });
  });
});
