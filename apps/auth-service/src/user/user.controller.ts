import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { LoginUserDTO, RegisterUserDto } from '@repo/dto/auth';
import { UserService } from "./user.service";
import { IEventsGetUserById } from '@repo/interfaces/events/user';

@Controller()
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @MessagePattern({ cmd: "register-user" })
    async registerUser(data: RegisterUserDto) {
        return this.userService.register(data)
    }

    @MessagePattern({ cmd: "login-user" })
    async loginUser(data: LoginUserDTO) {
        return this.userService.login(data)
    }

    @MessagePattern({ cmd: 'refresh-token' })
    async refreshToken(refresh_token: string) {
        return this.userService.refreshToken(refresh_token)
    }

    @MessagePattern({ cmd: 'get-user-by-id' })
    async getUserById(data: string): Promise<IEventsGetUserById> {
        return this.userService.getUserById(data)
    }

    @MessagePattern({ cmd: 'get-users-by-id' })
    async getUsersByIds(userIds: string[]) {
        return this.userService.getUsersByIds(userIds)
    }

}
