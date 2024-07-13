import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn, UpdateDateColumn, OneToOne
} from 'typeorm';
import {User} from "./User";

@Entity({ name: 'leave_balances' })
export class LeaveBalance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    before: number;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    after: number;

    @Column()
    log: string;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    totalBalance: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({ nullable: true })
    updatedAt: Date;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;
}
