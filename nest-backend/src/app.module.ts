import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./typeorm/entities/User";
import { LeavesModule } from './leaves/leaves.module';
import {Leave} from "./typeorm/entities/Leave";

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mysql',
    port:3306,
    host:'localhost',
    username:'root',
    password:'',
    database:'nestjs_jwt',
    entities:[User, Leave],
    synchronize:true
  }),AuthModule, LeavesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}