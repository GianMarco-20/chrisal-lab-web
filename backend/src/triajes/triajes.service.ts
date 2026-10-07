import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from '../citas/cita.entity';
import { EstadoCita } from '../citas/estado-cita.entity';
import { ActualizarTriajeDto } from './dto/actualizar-triaje.dto';
import { CrearTriajeDto } from './dto/crear-triaje.dto';
import { Triaje } from './triaje.entity';

// Al guardar el triaje, la cita pasa al siguiente paso del flujo (ver
// estados_cita, migración 004): el médico ya puede registrar el diagnóstico.
const ESTADO_SIGUIENTE = 'pendiente_diagnostico';

@Injectable()
export class TriajesService {
  constructor(
    @InjectRepository(Triaje) private readonly triajes: Repository<Triaje>,
    @InjectRepository(Cita) private readonly citas: Repository<Cita>,
    @InjectRepository(EstadoCita) private readonly estados: Repository<EstadoCita>,
  ) {}

  listar(citaId?: number): Promise<Triaje[]> {
    return this.triajes.find({
      where: citaId ? { cita: { id: citaId } } : {},
      order: { fechaRegistro: 'DESC' },
    });
  }

  async obtener(id: number): Promise<Triaje> {
    const triaje = await this.triajes.findOneBy({ id });
    if (!triaje) {
      throw new NotFoundException(`No existe el triaje ${id}`);
    }
    return triaje;
  }

  async crear(dto: CrearTriajeDto): Promise<Triaje> {
    const cita = await this.buscarCita(dto.citaId);

    const yaExiste = await this.triajes.findOne({ where: { cita: { id: dto.citaId } } });
    if (yaExiste) {
      throw new ConflictException(`La cita ${dto.citaId} ya tiene un triaje registrado.`);
    }

    const triaje = this.triajes.create({
      cita,
      peso: dto.peso ?? null,
      talla: dto.talla ?? null,
      presionArterial: dto.presionArterial ?? null,
      temperatura: dto.temperatura ?? null,
      frecuenciaCardiaca: dto.frecuenciaCardiaca ?? null,
      frecuenciaRespiratoria: dto.frecuenciaRespiratoria ?? null,
      saturacionO2: dto.saturacionO2 ?? null,
      motivoConsulta: dto.motivoConsulta ?? null,
    });
    const guardado = await this.triajes.save(triaje);

    const estadoSiguiente = await this.estados.findOneByOrFail({ codigo: ESTADO_SIGUIENTE });
    await this.citas.save({ id: cita.id, estado: estadoSiguiente });

    return guardado;
  }

  async actualizar(id: number, dto: ActualizarTriajeDto): Promise<Triaje> {
    const triaje = await this.obtener(id);

    // No usar Object.assign(triaje, dto): el DTO trae los campos no
    // enviados como `undefined` explícito (no ausentes), y Object.assign
    // sí los copia, borrando lo que ya estaba guardado. Por eso se revisa
    // campo por campo, igual que en ProgramacionMedicaService.
    if (dto.peso !== undefined) triaje.peso = dto.peso;
    if (dto.talla !== undefined) triaje.talla = dto.talla;
    if (dto.presionArterial !== undefined) triaje.presionArterial = dto.presionArterial;
    if (dto.temperatura !== undefined) triaje.temperatura = dto.temperatura;
    if (dto.frecuenciaCardiaca !== undefined) triaje.frecuenciaCardiaca = dto.frecuenciaCardiaca;
    if (dto.frecuenciaRespiratoria !== undefined) triaje.frecuenciaRespiratoria = dto.frecuenciaRespiratoria;
    if (dto.saturacionO2 !== undefined) triaje.saturacionO2 = dto.saturacionO2;
    if (dto.motivoConsulta !== undefined) triaje.motivoConsulta = dto.motivoConsulta;

    return this.triajes.save(triaje);
  }

  async eliminar(id: number): Promise<void> {
    await this.obtener(id);
    await this.triajes.delete(id);
  }

  private async buscarCita(citaId: number): Promise<Cita> {
    const cita = await this.citas.findOneBy({ id: citaId });
    if (!cita) {
      throw new BadRequestException(`No existe la cita ${citaId}.`);
    }
    return cita;
  }
}
