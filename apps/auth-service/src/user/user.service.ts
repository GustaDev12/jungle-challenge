import { Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { LoginUserDTO, RegisterUserDto } from '@repo/dto/auth';
import { hashPassword, comparePassword } from "src/utils/bcrypt";
import { JwtService } from "@nestjs/jwt";
import { RpcException } from "@nestjs/microservices";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { IEventsGetUserById, IEventsLoginUser, IEventsRegisterUser } from '@repo/interfaces/events/user';


@Injectable()
export class UserService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) { }

    async register(data: RegisterUserDto): Promise<IEventsRegisterUser> {
        try {
            const userExistsByName = await this.userRepository.findUserByName(data.username);
            if (userExistsByName) {
                throw new RpcException({
                    statusCode: 409,
                    message: 'Já existe um usuário com esse username cadastrado!',
                    error: 'Conflict'
                })
            }

            const userExistsByEmail = await this.userRepository.findUserByEmail(data.email);
            if (userExistsByEmail) {
                throw new RpcException({
                    statusCode: 409,
                    message: 'Já existe um usuário cadastrado com esse e-mail!',
                    error: 'Conflict'
                })
            }

            const newUser = {
                ...data,
                password: await hashPassword(data.password)
            }

            const user = await this.userRepository.createUser(newUser);
            const payload = { sub: user.id, email: user.email };

            const accessToken = this.jwtService.sign({ ...payload, type: 'access' }, {
                secret: process.env.JWT_SECRET || 'JUNGLE_SECRET_KEY',
                expiresIn: '15m'
            })

            const refreshToken = this.jwtService.sign({ ...payload, type: 'refresh' }, {
                secret: process.env.REFRESH_SECRET || 'JUNGLE_REFRESH_SECRET_KEY',
                expiresIn: '7d'
            })

            const { password, createdAt, updatedAt, ...userData } = user;

            return {
                message: "Usuário cadastrado com sucesso!",
                data: {
                    accessToken: accessToken,
                    refreshToken: refreshToken
                },
                user: userData
            }

        } catch (error) {
            console.log(error)
            
            if (error instanceof RpcException) {
                throw error;
            }
            throw new RpcException({
                statusCode: 500,
                message: 'Erro ao criar usuário',
                error: 'Internal Server Error'
            });
        }
    }

    async login(data: LoginUserDTO): Promise<IEventsLoginUser> {
        try {
            const user = await this.userRepository.findUserByEmail(data.email);
            if (!user) {
                throw new RpcException({
                    statusCode: 400,
                    message: 'Não existe nenhum usuário com esse email!',
                    error: 'Bad Request'
                })
            }

            const isPasswordValid = await comparePassword(data.password, user.password);

            if (!isPasswordValid) {
                throw new RpcException({
                    statusCode: 400,
                    message: 'Senha inválida!',
                    error: 'Bad Request',
                })
            }

            const payload = { sub: user.id, email: user.email };
            const accessToken = this.jwtService.sign({ ...payload, type: 'access' })
            const { password, createdAt, updatedAt, ...userData } = user;

            const refreshToken = this.jwtService.sign({ ...payload, type: 'refresh' }, {
                secret: process.env.REFRESH_SECRET,
                expiresIn: '7d'
            })

            return {
                message: 'Login realizado com sucesso!',
                data: {
                    accessToken: accessToken,
                    refreshToken: refreshToken
                },
                user: userData
            }
        } catch (error) {
            if (error instanceof RpcException) {
                throw error;
            }

            throw new RpcException({
                statusCode: 500,
                message: 'Erro ao realizar login',
                error: 'Internal Server Error'
            });
        }
    }

    async refreshToken(refresh_token: string): Promise<{ accessToken: string }> {

        try {
            const decode = this.jwtService.verify(refresh_token, {
                secret: process.env.REFRESH_SECRET,
            })

            if (decode.type !== 'refresh') {
                throw new RpcException({
                    statusCode: 401,
                    message: 'Token inválido!',
                    error: 'Unauthorized'
                })
            }

            const { sub, email } = decode;
            const payload = { sub, email }

            const accessToken = this.jwtService.sign({ ...payload, type: 'access' })
            this.logger.warn(`Novo refreshToken gerado para o usuário ${email}`, 'UserService.name')

            return {
                accessToken
            }

        } catch (error) {
            console.log(error)
            throw new RpcException({
                statusCode: 401,
                message: 'Token inválido!',
                error: 'Unauthorized'
            })
        }
    }

    async getUserById(id: string): Promise<IEventsGetUserById> {
        try {
            const user = await this.userRepository.findUserById(id);
            if (!user) {
                throw new RpcException({
                    statusCode: 404,
                    message: 'Usuário não encontrado!',
                    error: 'Not Found'
                })
            }

            return {
                message: 'Usuário encontrado com sucesso!',
                user: user
            }
        } catch (error) {
            if (error instanceof RpcException) {
                throw error;
            }

            throw new RpcException({
                statusCode: 500,
                message: 'Erro ao buscar usuário',
                error: 'Internal Server Error'
            });
        }
    }

    async getUsersByIds(userIds: string[]) {
        try {
            if (userIds.length === 0) {
                throw new RpcException({
                    statusCode: 400,
                    message: "A lista de ids não pode ser vazia!",
                    error: 'Bad Request'
                })
            }
            const users = await this.userRepository.findUsersByIds(userIds)
            return users
        } catch (error) {
            throw new RpcException({
                statusCode: 500,
                message: 'Erro ao buscar os usuários',
                error: 'Internal Server Error'
            });
        }
    }
}