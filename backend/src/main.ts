import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const ORIGENES_POR_DEFECTO = 'http://localhost:5173,http://localhost:5174';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.useGlobalPipes(
    // transform: true además de validar, construye la instancia de la clase del
    // DTO (necesario para que @ValidateNested/@Type validen objetos anidados,
    // como paciente dentro de CrearCitaDto).
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: (config.get<string>('CORS_ORIGINS') ?? ORIGENES_POR_DEFECTO)
      .split(',')
      .map((origen) => origen.trim()),
  });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
