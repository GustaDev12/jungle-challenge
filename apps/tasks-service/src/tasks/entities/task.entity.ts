import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { TaskUserEntity } from './task-user.entity';
import { StatusEnum, PriorityEnum } from '@repo/dto/tasks';
import { CommentsEntity } from './comment.entity';

@Entity("tasks")
export class TasksEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ type: 'timestamp' })
    prazo: Date;

    @Column({ type: 'enum', enum: PriorityEnum })
    priority: PriorityEnum

    @Column({ type: 'enum', enum: StatusEnum })
    status: StatusEnum

    @Column({ type: 'uuid' })
    ownerId: string

    @OneToMany(() => TaskUserEntity, taskUser => taskUser.task)
    assignedUsers: TaskUserEntity[]

    @OneToMany(() => CommentsEntity, comment => comment.task)
    comments: CommentsEntity[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}