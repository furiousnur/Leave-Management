import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'leaves' })
export class Leave {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    leave_type: string;

    @Column()
    date_from: string;

    @Column()
    date_to: string;

    @Column({ default: 'pending' })
    status: string;

    @Column({ nullable: true })
    reason: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({ nullable: true })
    updatedAt: Date;
}