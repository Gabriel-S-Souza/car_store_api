import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function createSwaggerDocument(app) {
  const config = new DocumentBuilder()
    .setTitle('Car Store: vitrine de veículos')
    .setDescription('API para gerenciamento de loja de veículos')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);
}
