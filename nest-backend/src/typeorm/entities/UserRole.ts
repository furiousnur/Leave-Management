import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from "./User";
import { Role } from "./Role";

@Entity({ name: 'user_has_role' })
export class UserRole {
    @PrimaryColumn()
    userId: number;

    @ManyToOne(() => User, user => user.userRole)
    @JoinColumn({ name: 'userId' })
    user: User;

    @PrimaryColumn()
    roleId: number;

    @ManyToOne(() => Role, role => role.userRoles)
    @JoinColumn({ name: 'roleId' })
    role: Role;
}
