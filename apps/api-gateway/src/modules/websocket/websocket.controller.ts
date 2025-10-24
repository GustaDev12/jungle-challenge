import { Body, Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices'
import { WebsocketGateway } from './websocket.gateway';
import type { NotificationData } from '@repo/interfaces'

@Controller()
export class NotificationsGatewayController {
    constructor(
        private readonly gateway: WebsocketGateway,
    ) { }

    @EventPattern('user.assigned-gateway')
    async UserAssigned(@Body() data: NotificationData) {
        return this.gateway.notifyUserAssigned({
            assignedBy: data.metadata.assignedBy,
            taskId: data.taskId as string,
            taskTitle: data.title,
            userId: data.userId
        })
    }

    @EventPattern('comment:new-gateway')
    async CommentNewGateway(@Body() data: NotificationData) {
        return this.gateway.notifyCommentCreated({
            taskId: data.taskId as string,
            taskTitle: data.title as string,
            commentId: data.commentId as string,
            content: data.message,
            authorId: data.userId,
            authorName: data.metadata.authorName,
            assignedUsers: data.metadata.assignedUsers
        })
    }

}