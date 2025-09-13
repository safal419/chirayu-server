import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerModuleConfig } from './~config/swagger.config';
import { configureCloudinary } from './multer-config';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configureCloudinary();

  // Setup Swagger for API documentation
  swaggerModuleConfig(app);

  // Enable CORS to allow requests from frontend
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.use('/uploads', express.static('uploads'));

  // Use global pipes for validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Start the NestJS application on port 3030 or env PORT (useful for local)
  const port = Number(process.env.PORT) || 3030;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`Application is running on: ${await app.getUrl()}`);
}

if (process.env.NODE_ENV !== 'serverless') {
  // keep main.ts behavior for local development
  bootstrap();
}

export default bootstrap;