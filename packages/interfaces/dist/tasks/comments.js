"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ICommentsTaskWithUser = exports.ICommentsTask = void 0;
class ICommentsTask {
    id;
    userId;
    taskId;
    content;
    createdAt;
}
exports.ICommentsTask = ICommentsTask;
class ICommentsTaskWithUser extends ICommentsTask {
    user;
}
exports.ICommentsTaskWithUser = ICommentsTaskWithUser;
//# sourceMappingURL=comments.js.map