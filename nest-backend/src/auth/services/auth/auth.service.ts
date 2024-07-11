import {BadRequestException, Injectable} from '@nestjs/common';
import {User} from "../../../typeorm/entities/User";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserParams} from "../../../utils/types";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private authRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    public async createUser(userDetails: UserParams){
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(userDetails.password, salt);
            const newUser = this.authRepository.create({
                ...userDetails,
                password: hashedPassword,
                createdAt: new Date(),
            });
            return this.authRepository.save(newUser);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    public async login(loginDetails: UserParams){
        try {
            const user = await this.authRepository.findOne({
                where: { username: loginDetails.username },
                relations: ['profile'],
            });
            if (!user) {
                throw new BadRequestException('Invalid username or password');
            }
            const isMatch = await bcrypt.compare(loginDetails.password, user.password);
            if (!isMatch) {
                throw new BadRequestException('Invalid username or password');
            }
            const payload = { username: user.username, password: loginDetails.password };
            const token = this.jwtService.sign(payload);
            return{token, user}
        } catch (e) {
            console.log(e);
            throw new BadRequestException(e.message);
        }
    }
}