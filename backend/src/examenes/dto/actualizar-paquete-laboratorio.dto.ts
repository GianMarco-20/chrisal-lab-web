import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class ActualizarPaqueteLaboratorioDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precio: number;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  @IsString({ each: true })
  @MaxLength(20, { each: true })
  examenesIds: string[];
}
