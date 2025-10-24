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
exports.CreateCommentDTO = void 0;
const class_validator_1 = require("class-validator");
class CreateCommentDTO {
    comment;
}
exports.CreateCommentDTO = CreateCommentDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "O comentário não pode ser vazio." }),
    (0, class_validator_1.IsString)({ message: "O comentário deve ser uma string." }),
    (0, class_validator_1.MinLength)(10, { message: "O comentário deve ter no minímo 10 caracteres." }),
    __metadata("design:type", String)
], CreateCommentDTO.prototype, "comment", void 0);
//# sourceMappingURL=create-comment.dto.js.map