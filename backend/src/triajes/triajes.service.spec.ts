import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { Cita } from '../citas/cita.entity';
import { Triaje } from './triaje.entity';
import { TriajesService } from './triajes.service';

const CITA = { id: 6 } as Cita;

describe('TriajesService', () => {
  let triajesRepo: {
    create: jest.Mock;
    save: jest.Mock;
    find: jest.Mock;
    findOne: jest.Mock;
    findOneBy: jest.Mock;
    delete: jest.Mock;
  };
  let citasRepo: { findOneBy: jest.Mock };
  let servicio: TriajesService;

  beforeEach(() => {
    triajesRepo = {
      create: jest.fn((datos) => datos),
      save: jest.fn((t) => Promise.resolve({ id: 100, ...t })),
      find: jest.fn(),
      findOne: jest.fn(),
      findOneBy: jest.fn(),
      delete: jest.fn(),
    };
    citasRepo = { findOneBy: jest.fn().mockResolvedValue(CITA) };

    servicio = new TriajesService(
      triajesRepo as unknown as import('typeorm').Repository<Triaje>,
      citasRepo as unknown as import('typeorm').Repository<Cita>,
    );
  });

  describe('crear', () => {
    it('crea el triaje con la cita resuelta y los datos enviados', async () => {
      triajesRepo.findOne.mockResolvedValue(null);

      const resultado = await servicio.crear({
        citaId: 6,
        peso: 70.5,
        talla: 170,
        presionArterial: '120/80',
        temperatura: 36.5,
        frecuenciaCardiaca: 72,
        saturacionO2: 98,
        motivoConsulta: 'Dolor de cabeza',
      });

      expect(resultado).toMatchObject({ cita: CITA, peso: 70.5, presionArterial: '120/80' });
    });

    it('rechaza una cita que no existe', async () => {
      citasRepo.findOneBy.mockResolvedValue(null);

      await expect(servicio.crear({ citaId: 999 })).rejects.toThrow(BadRequestException);
    });

    it('rechaza si la cita ya tiene un triaje', async () => {
      triajesRepo.findOne.mockResolvedValue({ id: 1 });

      await expect(servicio.crear({ citaId: 6 })).rejects.toThrow(ConflictException);
      expect(triajesRepo.save).not.toHaveBeenCalled();
    });

    it('guarda null en los campos que no se envían', async () => {
      triajesRepo.findOne.mockResolvedValue(null);

      const resultado = await servicio.crear({ citaId: 6 });

      expect(resultado).toMatchObject({ peso: null, talla: null, motivoConsulta: null });
    });
  });

  describe('obtener', () => {
    it('lanza NotFoundException si no existe', async () => {
      triajesRepo.findOneBy.mockResolvedValue(null);

      await expect(servicio.obtener(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('actualizar', () => {
    it('solo cambia los campos enviados', async () => {
      triajesRepo.findOneBy.mockResolvedValue({ id: 1, cita: CITA, peso: 70, talla: 170 });

      await servicio.actualizar(1, { peso: 72 });

      expect(triajesRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({ peso: 72, talla: 170 }),
      );
    });
  });

  describe('eliminar', () => {
    it('borra si existe', async () => {
      triajesRepo.findOneBy.mockResolvedValue({ id: 1 });

      await servicio.eliminar(1);

      expect(triajesRepo.delete).toHaveBeenCalledWith(1);
    });

    it('lanza NotFoundException si no existe', async () => {
      triajesRepo.findOneBy.mockResolvedValue(null);

      await expect(servicio.eliminar(999)).rejects.toThrow(NotFoundException);
      expect(triajesRepo.delete).not.toHaveBeenCalled();
    });
  });
});
