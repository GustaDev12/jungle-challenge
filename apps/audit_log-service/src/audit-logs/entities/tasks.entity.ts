import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity('tasks_logs')
export class AuditTasksLogsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'uuid', name: 'user_id' })
    userId: string

    @Column({ type: 'varchar', default: 'tasks-service' })
    serviceName: string

    @Column({ type: 'uuid', name: 'entity_id' })
    entityId: string 

    @Column({
        type: 'enum',
        enum: ['TASK_CREATED', 'TASK_UPDATED', 'TASK_DELETED', 'COMMENT_ADDED']
    })
    action: 'TASK_CREATED' | 'TASK_UPDATED' | 'TASK_DELETED' | 'COMMENT_ADDED'

    @Column({ type: 'jsonb' })
    payLoad: any

    @CreateDateColumn()
    createdAt: Date
}