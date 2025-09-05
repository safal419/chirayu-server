import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerModuleConfig } from './~config/swagger.config';
import * as express from 'express';
import * as mongoose from 'mongoose';

let server: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setup Swagger
  swaggerModuleConfig(app);

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

  app.use('/uploads', express.static('uploads'));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.init(); // no listen()
  return app.getHttpAdapter().getInstance();
}

// MongoDB events
mongoose.connection.on('connected', () => console.log('MongoDB connected'));
mongoose.connection.on('error', (err) => console.error('MongoDB error:', err));

// Export handler for Vercel
export default async function handler(req: any, res: any) {
  if (!server) {
    server = await bootstrap();
  }
  return server(req, res);
}

// Local dev only
if (process.env.NODE_ENV !== 'production') {
  bootstrap().then((app) =>
    app.listen(3030, () =>
      console.log('NestJS running at http://localhost:3030'),
    ),
  );
}
