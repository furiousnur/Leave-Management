import { IsNotEmpty, IsString } from 'class-validator';

export class UserProfileDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    dob: string;

    @IsNotEmpty()
    @IsString()
    position: string;
    
    @IsNotEmpty()
    @IsString()
    department: string; 

    @IsString()
    profile_pic?: string;
}
