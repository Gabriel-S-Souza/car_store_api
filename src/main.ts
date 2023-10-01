import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createSwaggerDocument } from './helpers/documentation.helper';
import { customValidationPipe } from './helpers/commom.helper';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

const server: express.Express = express();
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ extended: true, limit: '50mb' }));

async function bootstrap(expressInstance: express.Express) {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  app.enableCors();
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(customValidationPipe);
  createSwaggerDocument(app);
  await app.listen(3000);
}
bootstrap(server);
