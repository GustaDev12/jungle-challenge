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
exports.CreateTaskDTO = exports.StatusEnum = exports.PriorityEnum = void 0;
exports.IsNotPastDate = IsNotPastDate;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var PriorityEnum;
(function (PriorityEnum) {
    PriorityEnum["LOW"] = "LOW";
    PriorityEnum["MEDIUM"] = "MEDIUM";
    PriorityEnum["HIGH"] = "HIGH";
    PriorityEnum["URGENT"] = "URGENT";
})(PriorityEnum || (exports.PriorityEnum = PriorityEnum = {}));
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["TODO"] = "TODO";
    StatusEnum["IN_PROGRESS"] = "IN_PROGRESS";
    StatusEnum["REVIEW"] = "REVIEW";
    StatusEnum["DONE"] = "DONE";
})(StatusEnum || (exports.StatusEnum = StatusEnum = {}));
class CreateTaskDTO {
    title;
    description;
    prazo;
    priority;
    status;
}
exports.CreateTaskDTO = CreateTaskDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "O titulo da tarefa não pode ser vazio!" }),
    (0, class_validator_1.IsString)({ message: "O titulo da tarefa deve ser uma string!" }),
    (0, class_validator_1.MinLength)(4, { message: "O titulo da tarefa precisa ter no minímo 4 caracteres" }),
    __metadata("design:type", String)
], CreateTaskDTO.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "A descrição da tarefa não pode ser vazio!" }),
    (0, class_validator_1.IsString)({ message: "A descrição da tarefa deve ser uma string!" }),
    (0, class_validator_1.MinLength)(6, { message: "A descrição da tarefa precisa ter no minímo 6 caracteres" }),
    __metadata("design:type", String)
], CreateTaskDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "O prazo não pode ser vazio!" }),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    (0, class_validator_1.IsDate)({ message: "A data precisa ser um formato ISO 8601 string válido!" }),
    IsNotPastDate({ message: "A data não pode ser no passado!" }),
    __metadata("design:type", Date)
], CreateTaskDTO.prototype, "prazo", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(PriorityEnum, { message: "A prioridade precisa ser válida!" }),
    __metadata("design:type", String)
], CreateTaskDTO.prototype, "priority", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(StatusEnum, { message: "O status precisa ser válido!" }),
    __metadata("design:type", String)
], CreateTaskDTO.prototype, "status", void 0);
function IsNotPastDate(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isNotPastDate',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    if (!value)
                        return false;
                    const date = new Date(value);
                    const now = new Date();
                    return date.getTime() >= now.getTime();
                },
                defaultMessage(args) {
                    return `${args.property} não pode ser no passado!`;
                },
            },
        });
    };
}
//# sourceMappingURL=create-task.dto.js.map