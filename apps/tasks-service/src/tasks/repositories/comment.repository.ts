import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommentsEntity } from "../entities/comment.entity";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class CommentRepository {
    constructor(
        @InjectRepository(CommentsEntity) private readonly commentRepository: Repository<CommentsEntity>,
        @Inject("AUTH_SERVICE") private readonly userClient: ClientProxy
    ) { }

    async postCommenter(userId: string, taskId: string, content: string) {
        const entity = this.commentRepository.create({
            userId,
            taskId,
            content
        })
        const save = await this.commentRepository.save(entity)
        return save
    }

    async getCommentsPagination(taskId: string, page: number, size: number) {
        const take = size;
        const skip = (page - 1) * take;

        const [comments, total] = await this.commentRepository.findAndCount({
            skip,
            take,
            where: { taskId },
            order: { createdAt: 'DESC' },
        })

        const totalPages = Math.ceil(total / take);

        if (total === 0) {
            return {
                comments: [],
                meta: {
                    total,
                    page,
                    size,
                    totalPages
                }
            }
        }

        const users_id = [...new Set(comments.map(item => item.userId))];
        const usersData: { id: string, username: string, email: string }[] = await lastValueFrom(this.userClient.send({ cmd: 'get-users-by-id' }, users_id))

        const usersMap = new Map(usersData.map(user => [user.id, user]));
        const commentsWithUser = comments.map(comment => {
            const user = usersMap.get(comment.userId);
            return {
                ...comment,
                user: user || null
            }
        })

        return {
            comments: commentsWithUser,
            meta: {
                total,
                page,
                size,
                totalPages
            }
        }
    }
}
/*

        const users_id = [...new Set(comments.map(item => item.userId))];
        const usersData = await lastValueFrom(this.userClient.send({ cmd: 'get-users-by-id' }, users_id).pipe(
            timeout(5000),
        ))

        const usersMap = new Map(usersData.map(user => [user.id, user]));

        const commentsWithUser = comments.map(comment => {
            const user = usersMap.get(comment.userId);
            console.log(user)
        });

        */