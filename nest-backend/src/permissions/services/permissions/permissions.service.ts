import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Permission} from "../../../typeorm/entities/Permission";
import {Repository} from "typeorm";
import {PermissionParams} from "../../../utils/types";
import {RolePermission} from "../../../typeorm/entities/RolePermission";

@Injectable()
export class PermissionsService {
    constructor(
        @InjectRepository(Permission) private permissionRepository: Repository<Permission>,
        @InjectRepository(RolePermission) private rolePermissionRepository: Repository<RolePermission>,
    ) {}

    public async getPermission(){
        const permissions = this.permissionRepository.find();
        if (!permissions) {
            throw new NotFoundException('No attendance found');
        }
        return permissions;
    }

    public async createPermission(PermissionDetails: PermissionParams){
        try {
            const newPermission = this.permissionRepository.create({
                ...PermissionDetails,
                createdAt: new Date(),
            });
            return this.permissionRepository.save(newPermission);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    public async findPermission(id: number){
        const permission = await this.permissionRepository.findOne({
            where: { id }
        });
        if (!permission) {
            throw new NotFoundException('Permission not found');
        }
        return permission;
    }

    public async updatePermission(id: number, PermissionDetails: PermissionParams){
        const permission = await this.permissionRepository.findOne({ where: { id } });
        if (!permission) {
            throw new NotFoundException('Permission not found. Check the ID and try again');
        }

        Object.assign(permission, {
            ...PermissionDetails,
            updatedAt: new Date(),
        });
        return this.permissionRepository.save(permission);
    }

    public async deletePermission(id: number){
        const permission = await this.permissionRepository.findOne({ where: { id } });
        if (!permission) {
            throw new NotFoundException('Permission not found. Check the ID and try again');
        }
        await this.rolePermissionRepository.delete({ permissionId: id });
        return this.permissionRepository.remove(permission);
    }
}
