import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDTO {
    @IsNotEmpty({ message: 'refreshToken é obrigatório!' })
    @IsString({ message: 'refreshToken deve ser uma string!' })
    refreshToken: string;
}
