import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from './user.entity'
import { In, Repository } from "typeorm";
import { RegisterUserDto } from "@repo/dto/auth";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
    ) { }

    async findUserByName(name: string) {
        const user = await this.userRepository.findOne({
            where: {
                username: name
            }
        })
        return user
    }

    async findUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: {
                email
            },
        })
        return user
    }


    async findUserById(id: string) {
        const user = await this.userRepository.findOne({
            where: {
                id,
            }
        })
        return user
    }

    async createUser(data: RegisterUserDto) {
        const user = this.userRepository.create(data);
        await this.userRepository.save(user);
        return user;
    }

    async findUsersByIds(userIds: string[]) {
        const users = await this.userRepository.find({
            where: {
                id: In(userIds),
            },
            select: { id: true, email: true, username: true }
        })
        return users
    }

}