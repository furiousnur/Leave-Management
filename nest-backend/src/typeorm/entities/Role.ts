import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne} from 'typeorm';
import {RolePermission} from "./RolePermission";
import {User} from "./User";
import {UserRole} from "./UserRole";

@Entity({ name: 'roles' })
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true})
    name: string;

    @Column({ default: 'web' })
    guard_name: string;

    @Column({ default: 'Inactive' })
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({ nullable: true })
    updatedAt: Date;

    @OneToMany(() => RolePermission, rolePermission => rolePermission.role)
    permissions: RolePermission[];

    @OneToMany(() => UserRole, userRole => userRole.role)
    userRoles: UserRole[];
}
