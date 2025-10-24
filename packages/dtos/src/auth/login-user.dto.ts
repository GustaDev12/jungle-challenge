import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDTO {
    @IsEmail({}, { message: 'Email inválido!' })
    email: string;

    @IsNotEmpty({ message: 'Password é obrigatório!' })
    @IsString({ message: 'Password deve ser uma string!' })
    @MinLength(6, { message: 'Password deve ter no mínimo 6 caracteres!' })
    password: string;
}
