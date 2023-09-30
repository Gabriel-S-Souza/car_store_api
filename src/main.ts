import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createSwaggerDocument } from './helpers/documentation.helper';
import { customValidationPipe } from './helpers/commom.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(customValidationPipe);
  createSwaggerDocument(app);
  await app.listen(3000);
}
bootstrap();
