import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
    @IsNotEmpty({ message: 'Username é obrigatório!' })
    @IsString({ message: 'Username deve ser uma string!' })
    @MinLength(3, { message: 'Username deve ter no mínimo 3 caracteres!' })
    username: string;

    @IsEmail({}, { message: 'Email inválido!' })
    email: string;

    @IsNotEmpty({ message: 'Password é obrigatório!' })
    @IsString({ message: 'Password deve ser uma string!' })
    @MinLength(6, { message: 'Password deve ter no mínimo 6 caracteres!' })
    password: string;
}
