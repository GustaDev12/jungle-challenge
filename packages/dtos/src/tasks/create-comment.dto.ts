import { IsString, IsNotEmpty, MinLength } from 'class-validator'

export class CreateCommentDTO {
    @IsNotEmpty({ message: "O comentário não pode ser vazio." })
    @IsString({ message: "O comentário deve ser uma string." })
    @MinLength(10, { message: "O comentário deve ter no minímo 10 caracteres." })
    comment: string
}