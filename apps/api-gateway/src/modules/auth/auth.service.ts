import { Logger, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { LoginUserDTO, RefreshTokenDTO, RegisterUserDto } from '@repo/dto/auth';
import { ClientProxy } from "@nestjs/microservices";
import { catchError, lastValueFrom, timeout } from 'rxjs';
import { IEventsGetUserById, IEventsLoginUser, IEventsRegisterUser } from '@repo/interfaces/events/user'


@Injectable()
export class AuthService {
    constructor(
        @Inject("AUTH_SERVICE") private authClient: ClientProxy
    ) { }

    async register(data: RegisterUserDto): Promise<IEventsRegisterUser> {
        const response: IEventsRegisterUser = await lastValueFrom(this.authClient.send({ cmd: 'register-user' }, data).pipe(
            timeout(5000),
            catchError(error => {
                if (error.name === 'TimeoutError') {
                    throw new HttpException(
                        'Serviço de autenticação indisponível no momento!',
                        HttpStatus.SERVICE_UNAVAILABLE
                    );
                }
                throw new HttpException(
                    error.message || 'Serviço de autenticação indisponível no momento!',
                    error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
                );
            })
        ))
        return response
    }

    async login(data: LoginUserDTO, request_id: string): Promise<IEventsLoginUser> {
        const response: IEventsLoginUser = await lastValueFrom(this.authClient.send({ cmd: 'login-user' }, data).pipe(
            timeout(5000),
            catchError(error => {
                if (error.name === 'TimeoutError') {
                    throw new HttpException(
                        'Serviço de autenticação indisponível',
                        HttpStatus.SERVICE_UNAVAILABLE
                    );
                }
                throw new HttpException(
                    error.message || 'Serviço de autenticação indisponível no momento.',
                    error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
                );
            })
        ))
        return response
    }

    async refresh(refresh_token: string): Promise<{ accessToken: string }> {

        if (!refresh_token) {
            throw new HttpException('Refresh token não fornecido', HttpStatus.UNAUTHORIZED);
        }

        const response = await lastValueFrom(this.authClient.send({ cmd: 'refresh-token' }, refresh_token).pipe(
            timeout(5000),
            catchError(error => {
                if (error.name === 'TimeoutError') {
                    throw new HttpException(
                        'Serviço de autenticação indisponível',
                        HttpStatus.SERVICE_UNAVAILABLE
                    );
                }
                throw new HttpException(
                    error.message || 'Serviço de autenticação indisponível no momento.',
                    error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
                );
            })
        ))
        return {
            accessToken: response.accessToken
        }
    }

    async getUserById(id: string): Promise<IEventsGetUserById> {
        const response: IEventsGetUserById = await lastValueFrom(this.authClient.send({ cmd: 'get-user-by-id' }, id).pipe(
            timeout(5000)
        ))
        return response
    }
}