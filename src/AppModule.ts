import { MongooseDbModule } from './MongooseModule/MongooseDbModule';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './AppController';
import { AppService } from './AppService';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    MongooseDbModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
