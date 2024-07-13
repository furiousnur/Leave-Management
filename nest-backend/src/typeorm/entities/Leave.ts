import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { User } from "./User";

@Entity({ name: 'leaves' })
export class Leave {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    leave_type: string;

    @Column()
    date_from: string;

    @Column()
    date_to: string; 

    @Column({ default: 'Pending' })
    status: string;

    @Column({ nullable: true })
    reason: string;

    @Column({ nullable: true })
    totalLeave: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({ nullable: true })
    updatedAt: Date;

    @ManyToOne(() => User, user => user.leaves)
    @JoinColumn({ name: 'userId' })
    user: User;
}
