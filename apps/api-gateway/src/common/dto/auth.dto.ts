import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    description: 'Nome de usuário único',
    example: 'joao_silva',
    minLength: 3,
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'Username é obrigatório!' })
  @IsString({ message: 'Username deve ser uma string!' })
  @MinLength(3, { message: 'Username deve ter no mínimo 3 caracteres!' })
  username: string;

  @ApiProperty({
    description: 'Endereço de email válido',
    example: 'joao.silva@email.com',
    format: 'email',
  })
  @IsEmail({}, { message: 'Email inválido!' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'minhasenha123',
    minLength: 6,
    format: 'password',
  })
  @IsNotEmpty({ message: 'Password é obrigatório!' })
  @IsString({ message: 'Password deve ser uma string!' })
  @MinLength(6, { message: 'Password deve ter no mínimo 6 caracteres!' })
  password: string;
}

export class LoginUserDto {
  @ApiProperty({
    description: 'Endereço de email do usuário',
    example: 'joao.silva@email.com',
    format: 'email',
  })
  @IsEmail({}, { message: 'Email inválido!' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'minhasenha123',
    format: 'password',
  })
  @IsNotEmpty({ message: 'Password é obrigatório!' })
  @IsString({ message: 'Password deve ser uma string!' })
  @MinLength(6, { message: 'Password deve ter no mínimo 6 caracteres!' })
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Token de refresh para renovar o access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsNotEmpty({ message: 'Refresh token é obrigatório!' })
  @IsString({ message: 'Refresh token deve ser uma string!' })
  refreshToken: string;
}

export class AuthResponseDto {
  @ApiProperty({
    description: 'Mensagem de resposta',
    example: 'Login realizado com sucesso!',
  })
  message: string;

  @ApiProperty({
    description: 'Dados do token de acesso',
    type: 'object',
    properties: {
      accessToken: {
        type: 'string',
        description: 'Token JWT para autenticação',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  data: {
    accessToken: string;
  };

  @ApiProperty({
    description: 'Dados do usuário autenticado',
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID único do usuário',
        example: '123e4567-e89b-12d3-a456-426614174000',
      },
      username: {
        type: 'string',
        description: 'Nome de usuário',
        example: 'joao_silva',
      },
      email: {
        type: 'string',
        description: 'Email do usuário',
        example: 'joao.silva@email.com',
      },
    },
  })
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export class RefreshResponseDto {
  @ApiProperty({
    description: 'Mensagem de resposta',
    example: 'Token renovado com sucesso',
  })
  message: string;

  @ApiProperty({
    description: 'Novo token de acesso',
    type: 'object',
    properties: {
      accessToken: {
        type: 'string',
        description: 'Novo token JWT',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  data: {
    accessToken: string;
  };
}


