import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerModuleConfig } from './~config/swagger.config';
import * as express from 'express';
import * as mongoose from 'mongoose';

let server: any; // cache server for Vercel

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setup Swagger for API documentation
  swaggerModuleConfig(app);

  // Enable CORS for frontend
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://chirayuacademy.edu.np',
      'https://rayueducationalacademy.netlify.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Static uploads folder
  app.use('/uploads', express.static('uploads'));

  // Use global pipes for validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.init(); // ❌ don’t use app.listen on Vercel
  return app.getHttpAdapter().getInstance();
}

// Mongo connection logs
mongoose.connection.on('connected', () => console.log('MongoDB connected'));
mongoose.connection.on('error', (err) =>
  console.error('MongoDB connection error:', err),
);

// Exported handler for Vercel
export default async function handler(req: any, res: any) {
  if (!server) {
    server = await bootstrap();
  }
  return server(req, res);
}

// ✅ Local development support
if (process.env.NODE_ENV !== 'production') {
  bootstrap().then((app) => {
    app.listen(3030, () =>
      console.log(`NestJS running locally at http://localhost:3030`),
    );
  });
}
