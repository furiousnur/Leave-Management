import {BadRequestException, Injectable} from '@nestjs/common';
import {User} from "../../../typeorm/entities/User";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserParams} from "../../../utils/types";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {RolePermission} from "../../../typeorm/entities/RolePermission";
import {Permission} from "../../../typeorm/entities/Permission";
import {UserRole} from "../../../typeorm/entities/UserRole";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private authRepository: Repository<User>,
        @InjectRepository(RolePermission) private rolePermissionRepository: Repository<RolePermission>,
        @InjectRepository(Permission) private permissionRepository: Repository<Permission>,
        @InjectRepository(UserRole) private readonly userRoleRepository: Repository<UserRole>,
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
                relations: [
                    'profile',
                    'userRole',
                    'userRole.role',
                    'userRole.role.permissions',
                    'userRole.role.permissions.permission'
                ],
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
    
    public async verifyToken(userId: number){
        try {
            const user = await this.authRepository.findOne({
                where: { id: userId },
                select: ['id'],
                relations: [
                    'userRole.role',
                    'userRole.role.permissions',
                    'userRole.role.permissions.permission'
                ],
            });
            if (!user) {
                throw new BadRequestException('Invalid user id');
            }

            /*const permission = await this.permissionRepository.findOne({
                where: { name: permissionName },
            });
            console.log('permission', permission);
            if (!permission) {
                throw new BadRequestException('Permission not found');
            }
            user['hasPermission'] = user.userRole.role.permissions.some(
                (rolePermission) => rolePermission.permission.name === permissionName,
            );*/
            return user;
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}
