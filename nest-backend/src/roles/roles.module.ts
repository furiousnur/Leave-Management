import { Module } from '@nestjs/common';
import { RolesController } from './controllers/roles/roles.controller'; 
import { RolesService } from './services/roles/roles.service';
import {AuthModule} from "../auth/auth.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm"; 
import {Role} from "../typeorm/entities/Role";
import {PermissionsModule} from "../permissions/permissions.module";
import {RolePermission} from "../typeorm/entities/RolePermission";

@Module({
  imports: [
      AuthModule,
      PassportModule,
      JwtModule,
      TypeOrmModule.forFeature([Role, RolePermission]),
      PermissionsModule
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService, TypeOrmModule.forFeature([Role])]
})
export class RolesModule {}
