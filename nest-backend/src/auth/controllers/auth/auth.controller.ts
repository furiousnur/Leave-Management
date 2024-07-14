import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Req,
    Res,
    UseGuards
} from '@nestjs/common'; 
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

    @Post('logout')
    async logout(@Req() request: any) {
        const token = request.headers['authorization']?.split(' ')[1];
        if (token) {
            await this.authService.logout(token);
        }
        return { message: 'Logged out successfully' };
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
    
    @Get('verify-token/:userId')
    @UseGuards(JwtAuthGuards)
    async verifyToken(
        @Param('userId', ParseIntPipe) userId: number,
        @Req() req:Request, @Res() res: Response
    ){
        try {
            const data = await this.authService.verifyToken(userId);
            return res.status(HttpStatus.OK).json({
                message: 'Success',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}
