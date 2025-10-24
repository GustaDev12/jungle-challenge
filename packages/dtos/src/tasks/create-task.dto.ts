import { registerDecorator, ValidationArguments, IsString, IsNotEmpty, MinLength, IsEnum, IsDate, MinDate, ValidationOptions } from 'class-validator'
import { Transform } from 'class-transformer'

export enum PriorityEnum {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    URGENT = 'URGENT'
}

export enum StatusEnum {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    REVIEW = 'REVIEW',
    DONE = 'DONE'
}

export class CreateTaskDTO {
    @IsNotEmpty({ message: "O titulo da tarefa não pode ser vazio!" })
    @IsString({ message: "O titulo da tarefa deve ser uma string!" })
    @MinLength(4, { message: "O titulo da tarefa precisa ter no minímo 4 caracteres" })
    title: string

    @IsNotEmpty({ message: "A descrição da tarefa não pode ser vazio!" })
    @IsString({ message: "A descrição da tarefa deve ser uma string!" })
    @MinLength(6, { message: "A descrição da tarefa precisa ter no minímo 6 caracteres" })
    description: string

    @IsNotEmpty({ message: "O prazo não pode ser vazio!" })
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: "A data precisa ser um formato ISO 8601 string válido!" })
    @IsNotPastDate({ message: "A data não pode ser no passado!" })
    prazo: Date

    @IsEnum(PriorityEnum, { message: "A prioridade precisa ser válida!" })
    priority: PriorityEnum

    @IsEnum(StatusEnum, { message: "O status precisa ser válido!" })
    status: StatusEnum
}


export function IsNotPastDate(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isNotPastDate',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    if (!value) return false;
                    const date = new Date(value);
                    const now = new Date();
                    return date.getTime() >= now.getTime();
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} não pode ser no passado!`;
                },
            },
        });
    };
}