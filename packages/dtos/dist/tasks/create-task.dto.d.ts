import { ValidationOptions } from 'class-validator';
export declare enum PriorityEnum {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
    URGENT = "URGENT"
}
export declare enum StatusEnum {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    REVIEW = "REVIEW",
    DONE = "DONE"
}
export declare class CreateTaskDTO {
    title: string;
    description: string;
    prazo: Date;
    priority: PriorityEnum;
    status: StatusEnum;
}
export declare function IsNotPastDate(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
//# sourceMappingURL=create-task.dto.d.ts.map