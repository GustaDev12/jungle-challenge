import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { TasksEntity } from "./task.entity";

@Entity("comments")
export class CommentsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'uuid' })
    userId: string;

    @Column({ name: 'task_id', type: 'uuid' })
    taskId: string

    @Column({ type: 'text' })
    content: string

    @ManyToOne(() => TasksEntity, task => task.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'task_id' })
    task: TasksEntity

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date
}