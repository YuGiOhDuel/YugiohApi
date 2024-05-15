import { MongooseDbModule } from './MongooseModule/MongooseDbModule';
import { AuthModule } from './AuthModule/AuthModule';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './AppController';
import { AppService } from './AppService';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    MongooseDbModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
