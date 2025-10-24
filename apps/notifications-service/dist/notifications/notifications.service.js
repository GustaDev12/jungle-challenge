"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NotificationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const interfaces_1 = require("@repo/interfaces");
let NotificationsService = NotificationsService_1 = class NotificationsService {
    notificationsGateway;
    constructor(notificationsGateway) {
        this.notificationsGateway = notificationsGateway;
    }
    logger = new common_1.Logger(NotificationsService_1.name);
    async createNotification(data) {
        try {
            this.logger.log(`Criando notificação em tempo real para usuário ${data.userId}: ${data.type}`);
            const notification = {
                ...data,
                timestamp: new Date().toISOString(),
            };
            this.logger.log(`Notificação criada com sucesso para usuário ${data.userId}`);
            return notification;
        }
        catch (error) {
            this.logger.error(`Erro ao criar notificação: ${error.message}`, error.stack);
            throw error;
        }
    }
    async createTaskCreatedNotification(data) {
        return await this.createNotification({
            userId: data.userId,
            type: interfaces_1.NotificationType.TASK_CREATED,
            title: 'Nova tarefa criada',
            message: `Você criou a tarefa: ${data.taskTitle}`,
            taskId: data.taskId,
            timestamp: new Date().toISOString(),
            metadata: { taskTitle: data.taskTitle },
        });
    }
    async createTaskUpdatedNotification(data) {
        return await this.createNotification({
            userId: data.userId,
            type: interfaces_1.NotificationType.TASK_UPDATED,
            title: 'Tarefa atualizada',
            message: `A tarefa "${data.taskTitle}" mudou de ${data.oldStatus} para ${data.newStatus}`,
            taskId: data.taskId,
            timestamp: new Date().toISOString(),
            metadata: {
                taskTitle: data.taskTitle,
                oldStatus: data.oldStatus,
                newStatus: data.newStatus,
            },
        });
    }
    async createTaskAssignedNotification(data) {
        const notification = await this.createNotification({
            userId: data.userId,
            type: interfaces_1.NotificationType.TASK_ASSIGNED,
            title: data.taskTitle,
            message: `Você foi atribuído à tarefa: ${data.taskTitle}`,
            taskId: data.taskId,
            timestamp: new Date().toISOString(),
            metadata: {
                taskTitle: data.taskTitle,
                assignedBy: data.assignedBy,
            },
        });
        return this.notificationsGateway.emit("user.assigned-gateway", notification);
    }
    async createCommentNotification(data) {
        const notification = await this.createNotification({
            userId: data.authorId,
            type: interfaces_1.NotificationType.COMMENT_ADDED,
            title: 'Novo comentário',
            message: `${data.authorName} comentou na tarefa "${data.taskTitle}"`,
            taskId: data.taskId,
            commentId: data.commentId,
            timestamp: new Date().toISOString(),
            metadata: {
                taskTitle: data.taskTitle,
                authorName: data.authorName,
                assignedUsers: data.assignedUsers
            },
        });
        this.notificationsGateway.emit("comment:new-gateway", notification);
        return notification;
    }
    async createTaskDeletedNotification(data) {
        return await this.createNotification({
            userId: data.userId,
            type: interfaces_1.NotificationType.TASK_DELETED,
            title: 'Tarefa deletada',
            message: `A tarefa "${data.taskTitle}" foi deletada`,
            taskId: data.taskId,
            timestamp: new Date().toISOString(),
            metadata: { taskTitle: data.taskTitle },
        });
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = NotificationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("NOTIFICATIONS_SERVICE_GATEWAY")),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map