import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users/users.service';
import { User } from '../typeorm/entities/User';
import { Profile } from '../typeorm/entities/Profile';
import {UserRole} from "../typeorm/entities/UserRole";
import {RolesModule} from "../roles/roles.module";
import {Role} from "../typeorm/entities/Role";

@Module({
  imports: [
    AuthModule,
    PassportModule,
    JwtModule,
    TypeOrmModule.forFeature([User, Profile, UserRole, Role]),
    RolesModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
