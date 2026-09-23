import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const ORIGENES_POR_DEFECTO = 'http://localhost:5173,http://localhost:5174';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.enableCors({
    origin: (config.get<string>('CORS_ORIGINS') ?? ORIGENES_POR_DEFECTO)
      .split(',')
      .map((origen) => origen.trim()),
  });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
