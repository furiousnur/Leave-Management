import {BadRequestException, Controller, Get, HttpStatus, Res, UseGuards} from '@nestjs/common';
import {JwtAuthGuards} from "../../../auth/guards/jwt.guards";
import {LeaveBalanceService} from "../../services/leave-balance/leave-balance.service";
import {Response} from "express";

@Controller('leave-balance')
@UseGuards(JwtAuthGuards)
export class LeaveBalanceController {
    constructor(private readonly leaveBalanceService: LeaveBalanceService) {}
    
    @Get('/list')
    async getLeave(@Res() res: Response){
        try {
            const data = await this.leaveBalanceService.getLeaveBalance();
            return res.status(HttpStatus.OK).json({
                message: 'Leave Balance fetched successfully',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}
