import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { Cita } from '../citas/cita.entity';
import { Diagnostico } from './diagnostico.entity';
import { DiagnosticosService } from './diagnosticos.service';

const CITA = { id: 6 } as Cita;

describe('DiagnosticosService', () => {
  let diagnosticosRepo: {
    create: jest.Mock;
    save: jest.Mock;
    find: jest.Mock;
    findOne: jest.Mock;
    findOneBy: jest.Mock;
    delete: jest.Mock;
  };
  let citasRepo: { findOneBy: jest.Mock };
  let servicio: DiagnosticosService;

  beforeEach(() => {
    diagnosticosRepo = {
      create: jest.fn((datos) => datos),
      save: jest.fn((d) => Promise.resolve({ id: 100, ...d })),
      find: jest.fn(),
      findOne: jest.fn(),
      findOneBy: jest.fn(),
      delete: jest.fn(),
    };
    citasRepo = { findOneBy: jest.fn().mockResolvedValue(CITA) };

    servicio = new DiagnosticosService(
      diagnosticosRepo as unknown as import('typeorm').Repository<Diagnostico>,
      citasRepo as unknown as import('typeorm').Repository<Cita>,
    );
  });

  describe('crear', () => {
    it('crea el diagnóstico con la cita resuelta', async () => {
      diagnosticosRepo.findOne.mockResolvedValue(null);

      const resultado = await servicio.crear({ citaId: 6, diagnostico: 'Migraña' });

      expect(resultado).toMatchObject({ cita: CITA, diagnostico: 'Migraña' });
    });

    it('rechaza una cita que no existe', async () => {
      citasRepo.findOneBy.mockResolvedValue(null);

      await expect(servicio.crear({ citaId: 999, diagnostico: 'x' })).rejects.toThrow(
        BadRequestException,
      );
    });

    it('rechaza si la cita ya tiene un diagnóstico', async () => {
      diagnosticosRepo.findOne.mockResolvedValue({ id: 1 });

      await expect(servicio.crear({ citaId: 6, diagnostico: 'x' })).rejects.toThrow(
        ConflictException,
      );
      expect(diagnosticosRepo.save).not.toHaveBeenCalled();
    });
  });

  describe('obtener', () => {
    it('lanza NotFoundException si no existe', async () => {
      diagnosticosRepo.findOneBy.mockResolvedValue(null);

      await expect(servicio.obtener(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('actualizar', () => {
    it('reemplaza el texto del diagnóstico', async () => {
      diagnosticosRepo.findOneBy.mockResolvedValue({ id: 1, cita: CITA, diagnostico: 'Viejo' });

      await servicio.actualizar(1, { diagnostico: 'Nuevo' });

      expect(diagnosticosRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({ diagnostico: 'Nuevo' }),
      );
    });
  });

  describe('eliminar', () => {
    it('borra si existe', async () => {
      diagnosticosRepo.findOneBy.mockResolvedValue({ id: 1 });

      await servicio.eliminar(1);

      expect(diagnosticosRepo.delete).toHaveBeenCalledWith(1);
    });
  });
});
