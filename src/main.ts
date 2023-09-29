import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());
  createSwaggerDocument(app);
  await app.listen(3000);
}
bootstrap();

function createSwaggerDocument(app) {
  const config = new DocumentBuilder()
    .setTitle('Car Store: vitrine de veículos')
    .setDescription('API para gerenciamento de loja de veículos')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);
}
