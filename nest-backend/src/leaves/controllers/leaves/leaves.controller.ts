import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post, 
    Res,
    UseGuards
} from '@nestjs/common'; 
import {Response} from "express";
import {LeavesService} from "../../services/leaves/leaves.service";
import {JwtAuthGuards} from "../../../auth/guards/jwt.guards";
import {LeaveDto} from "../../dtos/leave.dto"; 

@Controller('leaves')
@UseGuards(JwtAuthGuards)
export class LeavesController {
    constructor(private readonly leaveService: LeavesService) {}

    @Get('/list')
    async getLeave(@Res() res: Response){
        try {
            const data = await this.leaveService.getLeave();
            return res.status(HttpStatus.OK).json({
                message: 'Leave fetched successfully',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Post('/create')
    async createLeave(@Body() leaveDto:LeaveDto,@Res() res: Response){
        try {
            const data = await this.leaveService.createLeave(leaveDto);
            return res.status(HttpStatus.OK).json({
                message: 'Leave created successfully',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Get('/:status/:id')
    async getLeaveByStatus(
        @Param('status') status: string,
        @Param('id', ParseIntPipe) id: number,
        @Res() res: Response
    ) {
        try {
            const data = await this.leaveService.acceptOrRejectLeave(status,id);
            return res.status(HttpStatus.OK).json({
                message: 'Status updated successfully',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}
