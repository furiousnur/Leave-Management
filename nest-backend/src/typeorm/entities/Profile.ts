import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'profiles' })
export class Profile {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ nullable: true })
    userId: number;

    @Column()
    name: string;

    @Column()
    dob: string;

    @Column()
    position: string;

    @Column()
    department: string;

    @Column({ nullable: true })
    profile_pic: string;

    @Column({ default: 'Pending' })
    status: string;

    @Column()
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;
    
    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;
}
