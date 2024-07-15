import { Module } from '@nestjs/common';
import { LeavesController } from './controllers/leaves/leaves.controller';
import { LeavesService } from './services/leaves/leaves.service';
import {AuthModule} from "../auth/auth.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm"; 
import {Leave} from "../typeorm/entities/Leave";
import {LeaveBalance} from "../typeorm/entities/LeaveBalance";
import {User} from "../typeorm/entities/User";

@Module({
    imports: [
      AuthModule,
      PassportModule,
      JwtModule,
      TypeOrmModule.forFeature([Leave, LeaveBalance, User])
    ],
    controllers: [LeavesController],
    providers: [LeavesService],
    exports: [LeavesService]
})
export class LeavesModule {}
