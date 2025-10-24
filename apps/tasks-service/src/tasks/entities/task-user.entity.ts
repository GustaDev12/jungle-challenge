import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TasksEntity } from "./task.entity";

@Entity("task_user")
export class TaskUserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'uuid' })
    taskId: string;

    @Column({ type: 'uuid' })
    userId: string;

    @ManyToOne(() => TasksEntity, task => task.assignedUsers)
    task: TasksEntity;
}