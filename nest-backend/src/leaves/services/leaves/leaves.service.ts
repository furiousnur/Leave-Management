import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm"; 
import {Repository} from "typeorm";
import {LeaveParams} from "../../../utils/types";
import {Leave} from "../../../typeorm/entities/Leave";
import {User} from "../../../typeorm/entities/User";

@Injectable()
export class LeavesService {
    constructor(
        @InjectRepository(Leave) private leaveRepository: Repository<Leave>
    ) {}
    
    public async getLeave(page: number = 1, limit: number = 10) {
        const [leaves, total] = await this.leaveRepository.findAndCount({
            relations: ['user'],
            take: limit,
            skip: (page - 1) * limit,
        });

        if (!leaves.length) {
            throw new NotFoundException('No leave found');
        }
        const totalPages = Math.ceil(total / limit);
        return {
            leaves,
            total,
            page,
            totalPages,
            limit,
        };
    }

    public async createLeave(LeaveDetails: LeaveParams) {
        try {
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
    
    public async acceptOrRejectLeave(status: string,id: number){ 
        try {
            const leave = await this.leaveRepository.findOne({ where: { id } });
            if (!leave) {
                throw new NotFoundException('Leave not found');
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
