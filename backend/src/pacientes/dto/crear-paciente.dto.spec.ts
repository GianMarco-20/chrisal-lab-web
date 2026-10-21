import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CrearPacienteDto } from './crear-paciente.dto';

describe('CrearPacienteDto', () => {
  it('pasa nombres y apellidos a mayúsculas, sin espacios de sobra', () => {
    const dto = plainToInstance(CrearPacienteDto, {
      dni: '12345678',
      nombres: '  Juan carlos  ',
      apellidos: 'pérez lópez',
    });

    expect(dto.nombres).toBe('JUAN CARLOS');
    expect(dto.apellidos).toBe('PÉREZ LÓPEZ');
  });

  it('no toca el dni ni el sexo', () => {
    const dto = plainToInstance(CrearPacienteDto, {
      dni: '12345678',
      nombres: 'ana',
      apellidos: 'torres',
      sexo: 'F',
    });

    expect(dto.dni).toBe('12345678');
    expect(dto.sexo).toBe('F');
  });

  describe('edad', () => {
    const base = { dni: '12345678', nombres: 'ana', apellidos: 'torres' };
    const errores = async (edad?: unknown) =>
      (await validate(plainToInstance(CrearPacienteDto, { ...base, edad }))).map((e) => e.property);

    it('es obligatoria', async () => {
      expect(await errores(undefined)).toContain('edad');
    });

    it('acepta una edad válida, también escrita como texto', async () => {
      expect(await errores(35)).toEqual([]);
      expect(await errores('35')).toEqual([]);
      expect(await errores(0)).toEqual([]);
    });

    it('rechaza edades imposibles', async () => {
      expect(await errores(-1)).toContain('edad');
      expect(await errores(121)).toContain('edad');
      expect(await errores(35.5)).toContain('edad');
      expect(await errores('abc')).toContain('edad');
    });
  });
});
