import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerModuleConfig } from './~config/swagger.config';
import * as express from 'express';
import * as mongoose from 'mongoose';

let server: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger (optional in dev mode only)
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

  await app.init();
  return app.getHttpAdapter().getInstance();
}

// Export handler for Vercel serverless function
export default async function handler(req: any, res: any) {
  if (!server) {
    server = await bootstrap();
  }
  return server(req, res);
}
