import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class LeaveDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;
 
    @IsNotEmpty()
    @IsString()
    leave_type: string;

    @IsNotEmpty()
    @IsString()
    date_from: string;

    @IsNotEmpty()
    @IsString()
    date_to: string; 

    @IsString()
    reason: string;
    
    @IsNumber()
    totalLeave: number;
}
