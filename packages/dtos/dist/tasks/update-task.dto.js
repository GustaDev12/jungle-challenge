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
exports.UpdateTaskDTO = void 0;
const class_validator_1 = require("class-validator");
const create_task_dto_1 = require("./create-task.dto");
const class_transformer_1 = require("class-transformer");
class UpdateTaskDTO {
    title;
    description;
    prazo;
    priority;
    status;
}
exports.UpdateTaskDTO = UpdateTaskDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)({ message: "O titulo da tarefa não pode ser vazio!" }),
    (0, class_validator_1.IsString)({ message: "O titulo da tarefa deve ser uma string!" }),
    (0, class_validator_1.MinLength)(4, { message: "O titulo da tarefa precisa ter no minímo 4 caracteres" }),
    __metadata("design:type", String)
], UpdateTaskDTO.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)({ message: "A descrição da tarefa não pode ser vazio!" }),
    (0, class_validator_1.IsString)({ message: "A descrição da tarefa deve ser uma string!" }),
    (0, class_validator_1.MinLength)(6, { message: "A descrição da tarefa precisa ter no minímo 6 caracteres" }),
    __metadata("design:type", String)
], UpdateTaskDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)({ message: "O prazo não pode ser vazio!" }),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    (0, class_validator_1.IsDate)({ message: "A data precisa ser um formato ISO 8601 string válido!" }),
    __metadata("design:type", Date)
], UpdateTaskDTO.prototype, "prazo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(create_task_dto_1.PriorityEnum, { message: "A prioridade precisa ser válida!" }),
    __metadata("design:type", String)
], UpdateTaskDTO.prototype, "priority", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(create_task_dto_1.StatusEnum, { message: "O status precisa ser válido!" }),
    __metadata("design:type", String)
], UpdateTaskDTO.prototype, "status", void 0);
//# sourceMappingURL=update-task.dto.js.map