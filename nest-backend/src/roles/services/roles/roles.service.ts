import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Role} from "../../../typeorm/entities/Role";
import {Repository} from "typeorm";
import {RoleParams} from "../../../utils/types";
import {RolePermission} from "../../../typeorm/entities/RolePermission";

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>,
        @InjectRepository(RolePermission) private rolePermissionRepository: Repository<RolePermission>,
    ) {}

    public async getRole(){
        const roles = this.roleRepository.find();
        if (!roles) {
            throw new NotFoundException('No attendance found');
        }
        return roles;
    }

    public async createRole(RoleDetails: RoleParams){
        try {
            const role = this.roleRepository.create({ 
                name: RoleDetails.name,
                status: RoleDetails.status,
                createdAt: new Date() 
            });
            await this.roleRepository.save(role);
            const rolePermissions = RoleDetails.permissions.map(permissionId => ({
                roleId: role.id,
                permissionId,
            }));
            await this.rolePermissionRepository.save(rolePermissions);
            return role;
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
    
    public async findRole(id: number){
        const role = await this.roleRepository.findOne({
            where: { id },
            relations: ['permissions'],
        });
        if (!role) {
            throw new NotFoundException('Role not found');
        }
        return role;
    }

    public async updateRole(id: number, RoleDetails: RoleParams) { 
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role) {
            throw new NotFoundException('Role not found. Check the ID and try again');
        }
        role.name = RoleDetails.name;
        role.status = RoleDetails.status;
        role.updatedAt = new Date();
        await this.roleRepository.save(role); 
        await this.rolePermissionRepository.delete({ roleId: id });
        const rolePermissions = RoleDetails.permissions.map(permissionId => ({
            roleId: id,
            permissionId,
        }));
        await this.rolePermissionRepository.save(rolePermissions);
        return role;
    }

    public async deleteRole(id: number){ 
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role) {
            throw new NotFoundException('Role not found. Check the ID and try again');
        }
        await this.rolePermissionRepository.delete({ roleId: id });
        return this.roleRepository.remove(role);
    }
}
