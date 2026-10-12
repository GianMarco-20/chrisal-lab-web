const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./dist/app.module');
const { CitasService } = require('./dist/citas/citas.service');

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const citasService = app.get(CitasService);
  try {
    const result = await citasService.listar();
    console.log('Success:', result);
  } catch (error) {
    console.error('TypeORM Error:', error);
  }
  await app.close();
}
bootstrap();
