import {BadRequestException, Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards} from '@nestjs/common';
import {Response, Request} from "express";
import {AuthService} from "../../services/auth/auth.service";
import {UserDto} from "../../dtos/user.dto";
import {AuthDto} from "../../dtos/auth.dto";
import {LocalGuards} from "../../guards/local.guards";
import {JwtAuthGuards} from "../../guards/jwt.guards";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/create-user')
    async createUser(@Body() userDto:UserDto,@Res() res: Response){
        try {
            const data = await this.authService.createUser(userDto);
            return res.status(HttpStatus.OK).json({
                message: 'User created successfully',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Post('login')
    @UseGuards(LocalGuards)
    async login(@Body() loginDto: AuthDto) {
        return this.authService.login(loginDto);
    }

    @Get('status')
    @UseGuards(JwtAuthGuards)
    async status(@Req() req:Request){
        try {
            console.log('status function using jwt auth guard');
            return 'Success';
        }catch (e){
            throw new BadRequestException(e.message);
        }
    }

    @Get('verify-token')
    @UseGuards(JwtAuthGuards)
    async verifyToken(@Req() req:Request){
        try {
            return 'Success';
        }catch (e){
            throw new BadRequestException(e.message);
        }
    }
}