import { Body, Controller, Get, HttpException, HttpStatus, Logger, Post, Req, Res } from "@nestjs/common";
import { LoginUserDTO, RegisterUserDto } from '@repo/dto/auth';
import { AuthService } from "./auth.service";
import type { Response, Request } from "express";
import { Throttle } from "@nestjs/throttler";
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBody, 
  ApiCookieAuth,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiTooManyRequestsResponse
} from '@nestjs/swagger';
import { 
  RegisterUserDto as SwaggerRegisterUserDto, 
  LoginUserDto as SwaggerLoginUserDto,
  AuthResponseDto,
  RefreshResponseDto
} from '../../common/dto/auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Throttle({ default: { limit: 10, ttl: 60000 } })
    @Post("register")
    @ApiOperation({ 
        summary: 'Registrar novo usuário',
        description: 'Cria uma nova conta de usuário no sistema. O usuário receberá um token JWT após o registro bem-sucedido.'
    })
    @ApiBody({ 
        type: SwaggerRegisterUserDto,
        description: 'Dados do usuário para registro',
        examples: {
            example1: {
                summary: 'Exemplo de registro',
                description: 'Dados básicos para criar uma nova conta',
                value: {
                    username: 'joao_silva',
                    email: 'joao.silva@email.com',
                    password: 'minhasenha123'
                }
            }
        }
    })
    @ApiResponse({ 
        status: 201, 
        description: 'Usuário registrado com sucesso',
        type: AuthResponseDto,
        headers: {
            'Set-Cookie': {
                description: 'Cookie com refresh token',
                schema: {
                    type: 'string',
                    example: 'refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; Path=/; Max-Age=604800'
                }
            }
        }
    })
    @ApiBadRequestResponse({ 
        description: 'Dados inválidos ou usuário já existe',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 400 },
                message: { type: 'string', example: 'Email já está em uso' },
                error: { type: 'string', example: 'Bad Request' }
            }
        }
    })
    @ApiTooManyRequestsResponse({ 
        description: 'Muitas tentativas de registro',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 429 },
                message: { type: 'string', example: 'ThrottlerException: Too Many Requests' },
                error: { type: 'string', example: 'Too Many Requests' }
            }
        }
    })
    @ApiInternalServerErrorResponse({ 
        description: 'Erro interno do servidor',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Erro interno do servidor' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async register(@Body() data: RegisterUserDto) {
        return this.authService.register(data)
    }

    @Throttle({ default: { limit: 10, ttl: 60000 } })
    @Post("login")
    @ApiOperation({ 
        summary: 'Fazer login',
        description: 'Autentica um usuário existente e retorna um token JWT. O refresh token é armazenado em um cookie HTTP-only.'
    })
    @ApiBody({ 
        type: SwaggerLoginUserDto,
        description: 'Credenciais de login',
        examples: {
            example1: {
                summary: 'Exemplo de login',
                description: 'Credenciais válidas para autenticação',
                value: {
                    email: 'joao.silva@email.com',
                    password: 'minhasenha123'
                }
            }
        }
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Login realizado com sucesso',
        type: AuthResponseDto,
        headers: {
            'Set-Cookie': {
                description: 'Cookie com refresh token',
                schema: {
                    type: 'string',
                    example: 'refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; Path=/; Max-Age=604800'
                }
            }
        }
    })
    @ApiBadRequestResponse({ 
        description: 'Credenciais inválidas',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 400 },
                message: { type: 'string', example: 'Email ou senha inválidos' },
                error: { type: 'string', example: 'Bad Request' }
            }
        }
    })
    @ApiTooManyRequestsResponse({ 
        description: 'Muitas tentativas de login',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 429 },
                message: { type: 'string', example: 'ThrottlerException: Too Many Requests' },
                error: { type: 'string', example: 'Too Many Requests' }
            }
        }
    })
    @ApiInternalServerErrorResponse({ 
        description: 'Erro interno do servidor',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Erro interno do servidor' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async login(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
        @Body() data: LoginUserDTO
    ) {
        try {
            const request_id = req["requestId"];
            const loginResult = await this.authService.login(data, request_id);
            res.cookie('refresh_token', loginResult.data.refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                path: '/',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            const { refreshToken, ...responseData } = loginResult.data;

            return {
                message: loginResult.message,
                user: loginResult.user,
                data: responseData
            };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Erro interno do servidor', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @Throttle({ default: { limit: 10, ttl: 60000 } })
    @Get("refresh")
    @ApiOperation({ 
        summary: 'Renovar token de acesso',
        description: 'Renova o token de acesso usando o refresh token armazenado no cookie. Retorna um novo access token.'
    })
    @ApiCookieAuth('refresh_token')
    @ApiResponse({ 
        status: 200, 
        description: 'Token renovado com sucesso',
        type: RefreshResponseDto
    })
    @ApiUnauthorizedResponse({ 
        description: 'Refresh token inválido ou expirado',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 401 },
                message: { type: 'string', example: 'Refresh token inválido' },
                error: { type: 'string', example: 'Unauthorized' }
            }
        }
    })
    @ApiTooManyRequestsResponse({ 
        description: 'Muitas tentativas de renovação',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 429 },
                message: { type: 'string', example: 'ThrottlerException: Too Many Requests' },
                error: { type: 'string', example: 'Too Many Requests' }
            }
        }
    })
    @ApiInternalServerErrorResponse({ 
        description: 'Erro interno do servidor',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Erro ao renovar token' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async refresh(@Req() req: Request) {
        try {
            const refreshToken = req.cookies?.refresh_token;
            const result = await this.authService.refresh(refreshToken);
            return {
                message: 'Token renovado com sucesso',
                data: result
            };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Erro ao renovar token', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}