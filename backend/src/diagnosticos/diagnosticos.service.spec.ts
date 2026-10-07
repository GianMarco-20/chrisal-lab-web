import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { CitaExamenesService } from '../cita-examenes/cita-examenes.service';
import { Cita } from '../citas/cita.entity';
import { EstadoCita } from '../citas/estado-cita.entity';
import { Diagnostico } from './diagnostico.entity';
import { DiagnosticosService } from './diagnosticos.service';

const CITA = { id: 6 } as Cita;
const ESTADO_ATENDIDA = { id: 3, codigo: 'atendida' } as EstadoCita;

describe('DiagnosticosService', () => {
  let diagnosticosRepo: {
    create: jest.Mock;
    save: jest.Mock;
    find: jest.Mock;
    findOne: jest.Mock;
    findOneBy: jest.Mock;
    delete: jest.Mock;
  };
  let citasRepo: { findOneBy: jest.Mock; save: jest.Mock };
  let estadosRepo: { findOneByOrFail: jest.Mock };
  let citaExamenesService: { crear: jest.Mock };
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
    citasRepo = {
      findOneBy: jest.fn().mockResolvedValue(CITA),
      save: jest.fn().mockResolvedValue(undefined),
    };
    estadosRepo = {
      findOneByOrFail: jest.fn().mockResolvedValue(ESTADO_ATENDIDA),
    };
    citaExamenesService = { crear: jest.fn().mockResolvedValue(undefined) };

    servicio = new DiagnosticosService(
      diagnosticosRepo as unknown as import('typeorm').Repository<Diagnostico>,
      citasRepo as unknown as import('typeorm').Repository<Cita>,
      estadosRepo as unknown as import('typeorm').Repository<EstadoCita>,
      citaExamenesService as unknown as CitaExamenesService,
    );
  });

  describe('crear', () => {
    it('crea el diagnóstico con la cita resuelta y pasa la cita a atendida', async () => {
      diagnosticosRepo.findOne.mockResolvedValue(null);

      const resultado = await servicio.crear({ citaId: 6, diagnostico: 'Migraña' });

      expect(resultado).toMatchObject({ cita: CITA, diagnostico: 'Migraña' });
      expect(citasRepo.save).toHaveBeenCalledWith({ id: 6, estado: ESTADO_ATENDIDA });
      expect(citaExamenesService.crear).not.toHaveBeenCalled();
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
      expect(citasRepo.save).not.toHaveBeenCalled();
    });

    it('ordena los exámenes de laboratorio enviados', async () => {
      diagnosticosRepo.findOne.mockResolvedValue(null);

      await servicio.crear({ citaId: 6, diagnostico: 'x', examenIds: [10, 20] });

      expect(citaExamenesService.crear).toHaveBeenCalledWith({ citaId: 6, examenId: 10 });
      expect(citaExamenesService.crear).toHaveBeenCalledWith({ citaId: 6, examenId: 20 });
      expect(citaExamenesService.crear).toHaveBeenCalledTimes(2);
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
