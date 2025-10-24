import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
@WebSocketGateway({
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true,
    },
    namespace: '/notifications',
})
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private jwtService: JwtService) { }

    @WebSocketServer()
    server: Server;

    private readonly logger = new Logger(WebsocketGateway.name);
    private userSockets = new Map<string, string>();


    async handleConnection(client: Socket) {
        try {
            const token = client.handshake.auth?.token || client.handshake.headers?.authorization?.replace('Bearer ', '');

            if (!token) {
                this.logger.warn('Cliente conectado sem token');
                client.disconnect();
                return;
            }

            const payload = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET || 'JUNGLE_SECRET_KEY',
            });

            if (payload.type !== 'access') {
                this.logger.warn('Token inválido - não é access token');
                client.disconnect();
                return;
            }

            const userId = payload.sub;
            this.userSockets.set(userId, client.id);

            await client.join(`user-${userId}`);

            this.logger.log(`Usuário ${userId} conectado via WebSocket`);


            client.emit('connected', {
                message: 'Conectado com sucesso',
                userId
            });

        } catch (error) {
            this.logger.error('Erro na autenticação WebSocket:', error);
            client.disconnect();
        }
    }

    handleDisconnect(client: Socket) {
        for (const [userId, socketId] of this.userSockets.entries()) {
            if (socketId === client.id) {
                this.userSockets.delete(userId);
                this.logger.log(`Usuário ${userId} desconectado`);
                break;
            }
        }
    }

    @SubscribeMessage('join-task-room')
    async handleJoinTaskRoom(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { taskId: string }
    ) {
        await client.join(`task-${data.taskId}`);
        this.logger.log(`Cliente ${client.id} entrou na sala da tarefa ${data.taskId}`);
    }

    @SubscribeMessage('leave-task-room')
    async handleLeaveTaskRoom(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { taskId: string }
    ) {
        await client.leave(`task-${data.taskId}`);
        this.logger.log(`Cliente ${client.id} saiu da sala da tarefa ${data.taskId}`);
    }

    async notifyCommentCreated(data: {
        taskId: string;
        taskTitle: string;
        commentId: string;
        content: string;
        authorId: string;
        authorName: string;
        assignedUsers: string[];
    }) {
        data.assignedUsers.filter(item => item != data.authorId)
            .forEach(userId => {
                this.server.to(`user-${userId}`).emit('comment:new', {
                    taskId: data.taskId,
                    taskTitle: data.taskTitle,
                    commentId: data.commentId,
                    content: data.content,
                    authorName: data.authorName,
                    message: data.content,
                    type: 'COMMENT_ADDED',
                    timestamp: new Date().toISOString(),
                });
            });

        this.logger.log(`Notificação de comentário enviada para ${data.assignedUsers.length - 1} usuários`);
    }

    async notifyUserAssigned(data: {
        taskId: string;
        taskTitle: string;
        userId: string;
        assignedBy: string;
    }) {
        console.log(data)
        this.server.to(`user-${data.userId}`).emit('task:assigned', {
            taskId: data.taskId,
            title: data.taskTitle,
            message: `Você foi atribuído à tarefa: ${data.taskTitle}`,
            type: 'TASK_ASSIGNED',
            assignedBy: data.assignedBy,
            timestamp: new Date().toISOString(),
        });

        this.logger.log(`Notificação de atribuição enviada para usuário ${data.userId}`);
    }
}