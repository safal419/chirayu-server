import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerModuleConfig } from './~config/swagger.config';
import * as express from 'express';
import * as mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setup Swagger for API documentation
  swaggerModuleConfig(app);

  // Enable CORS to allow requests from frontend
  app.enableCors({
  origin: [
    'http://localhost:3000',
    'https://chirayuacademy.edu.np',
    'https://rayueducationalacademy.netlify.app',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});
  app.use('/uploads', express.static('uploads'));

  // Use global pipes for validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Start the NestJS application on port 3030
  await app.listen(3030);
}

mongoose.connection.on('connected', () => console.log('MongoDB connected'));
mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));

bootstrap();
