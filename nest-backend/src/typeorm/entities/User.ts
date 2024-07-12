import { Column, Entity, OneToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Profile } from './Profile';
import { Leave } from "./Leave";
import {UserRole} from "./UserRole";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;

    @OneToOne(() => Profile, profile => profile.user)
    profile: Profile;

    @OneToMany(() => Leave, leave => leave.user)
    leaves: Leave[];
    
    @OneToOne(() => UserRole, userRole => userRole.user, { eager: true })
    userRole: UserRole;
}