import { Module } from '@nestjs/common'; 
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import {User} from "../typeorm/entities/User";
import {TypeOrmModule} from "@nestjs/typeorm"; 
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./strategies/local.strategy";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {RolePermission} from "../typeorm/entities/RolePermission";
import {Permission} from "../typeorm/entities/Permission";
import {UserRole} from "../typeorm/entities/UserRole";

@Module({
  imports:[
      PassportModule,
      TypeOrmModule.forFeature([User, RolePermission, Permission, UserRole]),
      JwtModule.register({
        secret: 'abc123',
        signOptions: { expiresIn: '120m' },
      }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
