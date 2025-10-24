"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogsMigration1760642776847 = void 0;
class AuditLogsMigration1760642776847 {
    name = 'AuditLogsMigration1760642776847';
    async up(queryRunner) {
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS audit_logs`);
        await queryRunner.query(`CREATE TYPE "audit_logs"."tasks_logs_action_enum" AS ENUM('TASK_CREATED', 'TASK_UPDATED', 'TASK_DELETED', 'COMMENT_ADDED')`);
        await queryRunner.query(`CREATE TABLE "audit_logs"."tasks_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "serviceName" character varying NOT NULL DEFAULT 'tasks-service', "entity_id" uuid NOT NULL, "action" "audit_logs"."tasks_logs_action_enum" NOT NULL, "payLoad" jsonb NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b3c0ea1efad83ccc933348cd313" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "audit_logs"."tasks_logs"`);
        await queryRunner.query(`DROP TYPE "audit_logs"."tasks_logs_action_enum"`);
    }
}
exports.AuditLogsMigration1760642776847 = AuditLogsMigration1760642776847;
//# sourceMappingURL=1760642776847-AuditLogsMigration.js.map