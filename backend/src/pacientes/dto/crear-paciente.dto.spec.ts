import { plainToInstance } from 'class-transformer';
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
});
