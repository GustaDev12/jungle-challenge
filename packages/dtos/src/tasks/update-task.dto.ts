import { IsString, IsNotEmpty, MinLength, IsEnum, IsDate, IsOptional } from 'class-validator'
import { PriorityEnum, StatusEnum } from './create-task.dto'
import { Transform } from 'class-transformer'


export class UpdateTaskDTO {
    @IsOptional()
    @IsNotEmpty({ message: "O titulo da tarefa não pode ser vazio!" })
    @IsString({ message: "O titulo da tarefa deve ser uma string!" })
    @MinLength(4, { message: "O titulo da tarefa precisa ter no minímo 4 caracteres" })
    title: string

    @IsOptional()
    @IsNotEmpty({ message: "A descrição da tarefa não pode ser vazio!" })
    @IsString({ message: "A descrição da tarefa deve ser uma string!" })
    @MinLength(6, { message: "A descrição da tarefa precisa ter no minímo 6 caracteres" })
    description: string

    @IsOptional()
    @IsNotEmpty({ message: "O prazo não pode ser vazio!" })
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: "A data precisa ser um formato ISO 8601 string válido!" })
    prazo: Date

    @IsOptional()
    @IsEnum(PriorityEnum, { message: "A prioridade precisa ser válida!" })
    priority: PriorityEnum

    @IsOptional()
    @IsEnum(StatusEnum, { message: "O status precisa ser válido!" })
    status: StatusEnum
}
