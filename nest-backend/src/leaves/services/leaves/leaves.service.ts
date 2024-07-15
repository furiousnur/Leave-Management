import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm"; 
import {Repository} from "typeorm";
import {LeaveParams} from "../../../utils/types";
import {Leave} from "../../../typeorm/entities/Leave";
import {User} from "../../../typeorm/entities/User";
import {LeaveBalance} from "../../../typeorm/entities/LeaveBalance";

@Injectable()
export class LeavesService {
    constructor(
        @InjectRepository(Leave) private leaveRepository: Repository<Leave>,
        @InjectRepository(LeaveBalance)
        private readonly leaveBalanceRepository: Repository<LeaveBalance>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    
    public async getLeave() {
        const [leaves] = await this.leaveRepository.findAndCount({
            relations: ['user']
        });

        if (!leaves.length) {
            throw new NotFoundException('No leave found');
        } 
        return leaves;
    }

    public async createLeave(LeaveDetails: LeaveParams) {
        try {
            const leaveBalance = await this.leaveBalanceRepository.findOne({
                where: { user: { id: LeaveDetails.userId } },
            });
            if (!leaveBalance) {
                throw new BadRequestException('Leave balance not found for the user.');
            }
            if (leaveBalance.totalBalance < LeaveDetails.totalLeave) {
                throw new BadRequestException('Insufficient leave balance.');
            }
            const newLeave = this.leaveRepository.create({
                ...LeaveDetails,
                user: { id: LeaveDetails.userId } as User,
                createdAt: new Date(),
            });

            return this.leaveRepository.save(newLeave);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    public async acceptOrRejectLeave(status: string, id: number) {
        try {
            const leave = await this.leaveRepository.findOne({
                where: { id },
                relations: ['user']
            });
            if (!leave) {
                throw new NotFoundException('Leave not found');
            }
            const leaveBalance = await this.leaveBalanceRepository.findOne({
                where: { user: { id: leave.user.id } },
            });
            if (!leaveBalance) {
                throw new BadRequestException('Leave balance not found for the user.');
            }
            if (status === 'Accepted') {
                if (leaveBalance.totalBalance < leave.totalLeave) {
                    throw new BadRequestException('Insufficient leave balance.');
                }
                const newTotalBalance = leaveBalance.totalBalance - leave.totalLeave;
                leaveBalance.before = leaveBalance.totalBalance;
                leaveBalance.after = newTotalBalance;
                leaveBalance.totalBalance = newTotalBalance;
                leaveBalance.log = `Deducted ${leave.totalLeave} days for leave from ${leave.date_from} to ${leave.date_to}`;

                await this.leaveBalanceRepository.save(leaveBalance);
            }
            return await this.leaveRepository.save({
                ...leave,
                status: status,
                updatedAt: new Date(),
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

}
