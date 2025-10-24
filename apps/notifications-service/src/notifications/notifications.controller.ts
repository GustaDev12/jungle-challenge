import { Body, Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices'
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
    constructor(
        private readonly notificationsService: NotificationsService,
    ) { }

    @EventPattern('user.assigned')
    async UserAssigned(@Body() data: {
        userId: string,
        taskId: string,
        taskTitle: string,
        assignedBy?: string
    }) {
        return this.notificationsService.createTaskAssignedNotification(data)
    }

    @EventPattern('comment:new')
    async CommentNew(@Body() data: {
        taskId: string,
        taskTitle: string,
        commentId: string,
        content: string,
        authorId: string,
        authorName: string,
        assignedUsers: string[]
    }) {
        return this.notificationsService.createCommentNotification(data)
    }

}