import {Entity, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm';
import {Role} from "./Role";
import {Permission} from "./Permission";

@Entity({ name: 'role_has_permissions' })
export class RolePermission {
    @PrimaryColumn()
    permissionId: number;

    @PrimaryColumn()
    roleId: number;

    @ManyToOne(() => Role, role => role.permissions)
    role: Role;

    @ManyToOne(() => Permission, permission => permission.rolePermissions)
    @JoinColumn({ name: 'permissionId' })
    permission: Permission;
}
