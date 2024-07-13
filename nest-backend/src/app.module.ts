import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./typeorm/entities/User";
import { UsersModule } from './users/users.module';
import {Profile} from "./typeorm/entities/Profile";
import { LeavesModule } from './leaves/leaves.module';
import {Leave} from "./typeorm/entities/Leave";
import { RolesModule } from './roles/roles.module';
import {Role} from "./typeorm/entities/Role";
import {PermissionsModule} from "./permissions/permissions.module";
import {Permission} from "./typeorm/entities/Permission";
import {RolePermission} from "./typeorm/entities/RolePermission";
import {UserRole} from "./typeorm/entities/UserRole";
import { SeederService } from './seeder/services/seeder.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mysql',
    port:3306,
    host:'localhost',
    username:'root',
    password:'',
    database:'leave_management',
    entities:[User, Profile, Leave, Role, Permission, RolePermission, UserRole],
    synchronize:true
  }),AuthModule, UsersModule, LeavesModule, RolesModule, PermissionsModule],
  controllers: [AppController],
  providers: [AppService, SeederService],
})
export class AppModule {}
