import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../typeorm/entities/Role';
import { Permission } from '../../typeorm/entities/Permission';
import { UserRole } from '../../typeorm/entities/UserRole';
import { User } from '../../typeorm/entities/User';
import * as bcrypt from 'bcrypt';
import { RolePermission } from '../../typeorm/entities/RolePermission';

@Injectable()
export class SeederService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
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
        // Create a user
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash('12345678', salt);
        const user = this.userRepository.create({ username: 'admin', password: hashedPassword, createdAt: new Date() });
        await this.userRepository.save(user);

        // Create a role
        const adminRole = this.roleRepository.create({ name: 'Admin', guard_name: 'api', status: 'Active', createdAt: new Date() });
        await this.roleRepository.save(adminRole);

        // Assign role to the user
        const userRole = this.userRoleRepository.create({ userId: user.id, roleId: adminRole.id });
        await this.userRoleRepository.save(userRole);

        // Create permissions
        const permissions = [
            { name: 'sidebar-dashboard', guard_name: 'api', status: 'Active', createdAt: new Date() },
            { name: 'sidebar-users-settings', guard_name: 'api', status: 'Active', createdAt: new Date() },
            { name: 'sidebar-leaves', guard_name: 'api', status: 'Active', createdAt: new Date() },
            { name: 'user-list', guard_name: 'api', status: 'Active', createdAt: new Date() },
            { name: 'user-create', guard_name: 'api', status: 'Active', createdAt: new Date() },
            { name: 'user-edit', guard_name: 'api', status: 'Active', createdAt: new Date() },
            { name: 'user-delete', guard_name: 'api', status: 'Active', createdAt: new Date() },
            { name: 'user-accept-reject', guard_name: 'api', status: 'Active', createdAt: new Date() },
            { name: 'user-role-set', guard_name: 'api', status: 'Active', createdAt: new Date() },
            { name: 'role-list', guard_name: 'api', status: 'Active', createdAt: new Date() },
            { name: 'role-create', guard_name: 'api', status: 'Active', createdAt: new Date() },
            { name: 'role-edit', guard_name: 'api', status: 'Active', createdAt: new Date() },
            { name: 'role-delete', guard_name: 'api', status: 'Active', createdAt: new Date() },
            { name: 'permission-list', guard_name: 'api', status: 'Active', createdAt: new Date() },
            { name: 'permission-create', guard_name: 'api', status: 'Active', createdAt: new Date() },
            { name: 'permission-edit', guard_name: 'api', status: 'Active', createdAt: new Date() },
            { name: 'permission-delete', guard_name: 'api', status: 'Active', createdAt: new Date() },
            { name: 'leave-list', guard_name: 'api', status: 'Active', createdAt: new Date() },
            { name: 'leave-create', guard_name: 'api', status: 'Active', createdAt: new Date() },
            { name: 'leave-edit', guard_name: 'api', status: 'Active', createdAt: new Date() },
            { name: 'leave-delete', guard_name: 'api', status: 'Active', createdAt: new Date() },
            { name: 'leave-accept-reject', guard_name: 'api', status: 'Active', createdAt: new Date() },
        ];

        const permissionEntities = this.permissionRepository.create(permissions);
        await this.permissionRepository.save(permissionEntities);

        // Assign all permissions to the admin role
        const rolePermissions = permissionEntities.map(permission => this.rolePermissionRepository.create({
            roleId: adminRole.id,
            permissionId: permission.id
        }));
        await this.rolePermissionRepository.save(rolePermissions);

        console.log('Seeding completed.');
    }
}
