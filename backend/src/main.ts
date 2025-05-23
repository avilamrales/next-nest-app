import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.setGlobalPrefix('api');

  app.enableCors({ origins: ['http://localhost:3000'] });

  await app.listen(process.env.PORT ?? 4000);
}

void bootstrap();
