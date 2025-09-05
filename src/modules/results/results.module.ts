import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { Result, ResultSchema } from './entities/result.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Result.name, schema: ResultSchema }])],
  controllers: [ResultsController],
  providers: [ResultsService],
})
export class ResultsModule {}
