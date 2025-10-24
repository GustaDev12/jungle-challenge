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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditTasksLogsEntity = void 0;
const typeorm_1 = require("typeorm");
let AuditTasksLogsEntity = class AuditTasksLogsEntity {
    id;
    userId;
    serviceName;
    entityId;
    action;
    payLoad;
    createdAt;
};
exports.AuditTasksLogsEntity = AuditTasksLogsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AuditTasksLogsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', name: 'user_id' }),
    __metadata("design:type", String)
], AuditTasksLogsEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'tasks-service' }),
    __metadata("design:type", String)
], AuditTasksLogsEntity.prototype, "serviceName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', name: 'entity_id' }),
    __metadata("design:type", String)
], AuditTasksLogsEntity.prototype, "entityId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['TASK_CREATED', 'TASK_UPDATED', 'TASK_DELETED', 'COMMENT_ADDED']
    }),
    __metadata("design:type", String)
], AuditTasksLogsEntity.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Object)
], AuditTasksLogsEntity.prototype, "payLoad", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AuditTasksLogsEntity.prototype, "createdAt", void 0);
exports.AuditTasksLogsEntity = AuditTasksLogsEntity = __decorate([
    (0, typeorm_1.Entity)('tasks_logs')
], AuditTasksLogsEntity);
//# sourceMappingURL=tasks.entity.js.map