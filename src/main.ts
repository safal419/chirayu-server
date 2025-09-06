import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';
import serverless from 'serverless-http';


let cachedServerless: any = null;
let cachedAppInitialized = false;

async function createNestApp() {
  // create app only once per lambda instance
  const app = await NestFactory.create(AppModule, { bodyParser: true });
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://chirayuacademy.edu.np',
      'https://rayueducationalacademy.netlify.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // connect to mongo only once per lambda instance
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI environment variable not set');
  }
  // reuse mongoose connection across invocations
  // @ts-ignore
  if (!globalThis.__mongooseConnected) {
    await mongoose.connect(process.env.MONGO_URI);
    // @ts-ignore
    globalThis.__mongooseConnected = true;
  }

  await app.init();
  return app;
}

// serverless handler (Vercel)
export const handler = async (req: any, res: any) => {
  // initialize once and reuse
  if (!cachedAppInitialized) {
    const app = await createNestApp();
    const expressInstance = app.getHttpAdapter().getInstance();
    cachedServerless = serverless(expressInstance);
    cachedAppInitialized = true;
  }

  return cachedServerless(req, res);
};

// local bootstrap (development / when running as a normal server)
if (!process.env.VERCEL) {
  async function bootstrap() {
    const app = await createNestApp();
    const port = process.env.PORT || 3030;
    await app.listen(port);
    // eslint-disable-next-line no-console
    console.log(`🚀 App running on http://localhost:${port}`);
  }
  bootstrap();
}

