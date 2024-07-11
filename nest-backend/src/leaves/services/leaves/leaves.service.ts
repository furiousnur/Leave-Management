import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {LeaveParams} from "../../../utils/types";
import {Leave} from "../../../typeorm/entities/Leave";

@Injectable()
export class LeavesService {
    constructor(
        @InjectRepository(Leave) private leaveRepository: Repository<Leave>
    ) {}

    public async getLeave(){
        const leaves = this.leaveRepository.find();
        if (!leaves) {
            throw new NotFoundException('No leave found');
        }
        return leaves;
    }

    public async createLeave(LeaveDetails: LeaveParams){
        try {
            const newUser = this.leaveRepository.create({
                ...LeaveDetails,
                createdAt: new Date(),
            });
            return this.leaveRepository.save(newUser);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}