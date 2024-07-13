import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Permission} from "../typeorm/entities/Permission";
import {SeederService} from "./services/seeder.service";
import {User} from "../typeorm/entities/User";
import {UserRole} from "../typeorm/entities/UserRole";
import {RolePermission} from "../typeorm/entities/RolePermission";
import {Role} from "../typeorm/entities/Role"; 

@Module({
    imports: [TypeOrmModule.forFeature([Role, User, RolePermission, Permission, UserRole])],
    providers: [SeederService],
    exports: [SeederService],
})
export class SeederModule {}
