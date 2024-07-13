import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../typeorm/entities/Role';
import { Permission } from '../../typeorm/entities/Permission';
import { UserRole } from '../../typeorm/entities/UserRole';
import { User } from '../../typeorm/entities/User';
import * as bcrypt from 'bcrypt';
import { RolePermission } from '../../typeorm/entities/RolePermission';
import { Profile } from "../../typeorm/entities/Profile";

@Injectable()
export class SeederService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Profile)
        private readonly userProfileRepository: Repository<Profile>,
        @InjectRepository(UserRole)
        private readonly userRoleRepository: Repository<UserRole>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
        @InjectRepository(RolePermission)
        private readonly rolePermissionRepository: Repository<RolePermission>,
    ) {}

    async seed() {
        // Check if the user already exists
        let user = await this.userRepository.findOne({ where: { username: 'admin' } });
        if (!user) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash('12345678', salt);
            user = this.userRepository.create({ username: 'admin', password: hashedPassword, createdAt: new Date() });
            await this.userRepository.save(user);
        }

        // Check if the profile already exists
        let userProfile = await this.userProfileRepository.findOne({ where: { userId: user.id } });
        if (!userProfile) {
            userProfile = this.userProfileRepository.create(
                { userId: user.id, name: 'Admin', dob: '1999-01-01', position: 'Software Engineer', department: 'Software', status: 'Accepted', createdAt: new Date() }
            );
            await this.userProfileRepository.save(userProfile);
        }

        // Check if the role already exists
        let adminRole = await this.roleRepository.findOne({ where: { name: 'Admin' } });
        if (!adminRole) {
            adminRole = this.roleRepository.create({ name: 'Admin', guard_name: 'api', status: 'Active', createdAt: new Date() });
            await this.roleRepository.save(adminRole);
        }

        // Check if the user role already exists
        let userRole = await this.userRoleRepository.findOne({ where: { userId: user.id, roleId: adminRole.id } });
        if (!userRole) {
            userRole = this.userRoleRepository.create({ userId: user.id, roleId: adminRole.id });
            await this.userRoleRepository.save(userRole);
        }

        // Check if permissions already exist
        const permissions = ['sidebar-dashboard', 'sidebar-users-settings', 'sidebar-leaves', 'user-list', 'user-create', 'user-edit', 'user-delete', 'user-accept-reject',
            'user-role-set', 'role-list', 'role-create', 'role-edit', 'role-delete', 'permission-list', 'permission-create', 'permission-edit', 'permission-delete', 
            'leave-list', 'leave-create', 'leave-edit', 'leave-delete', 'leave-accept-reject',
        ];

        const permissionEntities = await Promise.all(permissions.map(async (name) => {
            let permission = await this.permissionRepository.findOne({ where: { name } });
            if (!permission) {
                permission = this.permissionRepository.create({ name, guard_name: 'api', status: 'Active', createdAt: new Date() });
                await this.permissionRepository.save(permission);
            }
            return permission;
        }));

        // Assign all permissions to the admin role
        await Promise.all(permissionEntities.map(async (permission) => {
            let rolePermission = await this.rolePermissionRepository.findOne({ where: { roleId: adminRole.id, permissionId: permission.id } });
            if (!rolePermission) {
                rolePermission = this.rolePermissionRepository.create({
                    roleId: adminRole.id,
                    permissionId: permission.id
                });
                await this.rolePermissionRepository.save(rolePermission);
            }
            return rolePermission;
        }));

        console.log('Seeding completed.');
    }
}