import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { swaggerModuleConfig } from './~config/swagger.config';
import { configureCloudinary } from './multer-config';
import { AppModule } from './app.module';
import * as express from 'express';
import serverless from 'serverless-http';

let server: any = null;

async function bootstrapExpressApp() {
  const expressApp = express();
  const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp), {
    logger: ['error', 'warn', 'log'],
  });

  // Cloudinary, swagger, cors, validation and static uploads
  configureCloudinary();
  swaggerModuleConfig(nestApp);
  nestApp.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  nestApp.use('/uploads', express.static('uploads'));
  nestApp.useGlobalPipes(new ValidationPipe({ transform: true }));

  await nestApp.init();

  return expressApp;
}

module.exports = async (req: any, res: any) => {
  try {
    if (!server) {
      const app = await bootstrapExpressApp();
      server = serverless(app);
    }
    return server(req, res);
  } catch (err) {
    // ensure errors are logged in Vercel logs
    // eslint-disable-next-line no-console
    console.error('Serverless handler bootstrap error', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
};