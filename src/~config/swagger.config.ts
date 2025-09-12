import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EventsModule } from 'src/modules/events/events.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { GalleryModule } from 'src/modules/gallery/gallery.module';
import { NoticesModule } from 'src/modules/notices/notices.module';
import { ResultsModule } from 'src/modules/results/results.module';
import { UsersModule } from 'src/modules/users/users.module';
import { ArticlesModule } from 'src/modules/article/article.module';
import { AlumniModule } from 'src/modules/alumni/alumni.module';
export const swaggerModuleConfig = (app: INestApplication) => {
  // For Root Swagger Document
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Root API')
    .setDescription('API For Admin Portal.')
    .setVersion('1.0.0')
    .addBearerAuth
    // {
    //   description: 'Default JWT Authorization',
    //   type: 'http',
    //   in: 'header',
    //   scheme: 'bearer',
    //   bearerFormat: 'JWT',
    // },
    // 'defaultBearerAuth',
    ()
    .build();

  const rootApiDocument = SwaggerModule.createDocument(app, swaggerConfig, {
    include: [AuthModule, UsersModule, NoticesModule, ResultsModule, GalleryModule, EventsModule, ArticlesModule, AlumniModule],
  });
  SwaggerModule.setup('api', app, rootApiDocument);
};