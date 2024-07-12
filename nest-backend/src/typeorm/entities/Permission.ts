import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import {RolePermission} from "./RolePermission"; 

@Entity({ name: 'permissions' })
export class Permission {
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

    @OneToMany(() => RolePermission, rolePermission => rolePermission.permission)
    rolePermissions: RolePermission[];
}
