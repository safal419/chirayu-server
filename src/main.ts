import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerModuleConfig } from './~config/swagger.config';
import * as express from 'express';
import * as mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setup Swagger only in dev mode
  if (process.env.NODE_ENV !== 'production') {
    swaggerModuleConfig(app);
  }

  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://chirayuacademy.edu.np',
      'https://rayueducationalacademy.netlify.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Serve uploads
  app.use('/uploads', express.static('uploads'));

  // Global validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Connect to MongoDB
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI environment variable not set');
  }
  await mongoose.connect(process.env.MONGO_URI);

  // Listen on Render-assigned port
  const port = process.env.PORT || 3030;
  await app.listen(port, () =>
    console.log(`Server running on port ${port}`),
  );
}

bootstrap();
