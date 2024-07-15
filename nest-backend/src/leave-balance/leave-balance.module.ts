import { Module } from '@nestjs/common';
import { LeaveBalanceService } from './services/leave-balance/leave-balance.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScheduleModule} from "@nestjs/schedule";
import {User} from "../typeorm/entities/User";
import {LeaveBalance} from "../typeorm/entities/LeaveBalance";
import {Leave} from "../typeorm/entities/Leave";
import {LoggerModule} from "../logger/logger.module";
import { LeaveBalanceController } from './controllers/leave-balance/leave-balance.controller';

@Module({
  imports: [
      ScheduleModule.forRoot(),
      TypeOrmModule.forFeature([LeaveBalance, User, Leave]),
      LoggerModule
  ],
  controllers: [LeaveBalanceController],
  providers: [LeaveBalanceService],
  exports: [LeaveBalanceService, TypeOrmModule.forFeature([LeaveBalance])],
})
export class LeaveBalanceModule {}
