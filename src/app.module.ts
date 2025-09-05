import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { FileModule } from './modules/file/file.module';
import { NoticesModule } from './modules/notices/notices.module';
import { EventsModule } from './modules/events/events.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { ResultsModule } from './modules/results/results.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        uri: cs.get<string>('MONGO_URI'),
      }),
    }),
    UsersModule,
    AuthModule,
    FileModule,
    NoticesModule,
    EventsModule,
    GalleryModule,
    ResultsModule,
    

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
