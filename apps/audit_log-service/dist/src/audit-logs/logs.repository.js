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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tasks_entity_1 = require("./entities/tasks.entity");
const typeorm_2 = require("typeorm");
let AuditLogsRepository = class AuditLogsRepository {
    auditLogsRepository;
    constructor(auditLogsRepository) {
        this.auditLogsRepository = auditLogsRepository;
    }
    async registerTaskLog(data) {
        const entity = this.auditLogsRepository.create({
            action: data.action,
            serviceName: data.serviceName,
            entityId: data.entityId,
            userId: data.userId,
            payLoad: JSON.stringify(data.payLoad)
        });
        const save = await this.auditLogsRepository.save(entity);
        return save;
    }
};
exports.AuditLogsRepository = AuditLogsRepository;
exports.AuditLogsRepository = AuditLogsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tasks_entity_1.AuditTasksLogsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuditLogsRepository);
//# sourceMappingURL=logs.repository.js.map