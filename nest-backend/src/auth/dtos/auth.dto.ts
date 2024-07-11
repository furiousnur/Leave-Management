import {IsNotEmpty, IsString, MinLength} from "class-validator";

export class AuthDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8, {message: 'Password must be at least 8 characters long'})
    password: string;
}