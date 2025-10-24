import { MigrationInterface, QueryRunner } from "typeorm";

export class TasksMigration1760476813032 implements MigrationInterface {
    name = 'TasksMigration1760476813032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "tasks"."tasks_priority_enum" RENAME TO "tasks_priority_enum_old"`);
        await queryRunner.query(`CREATE TYPE "tasks"."tasks_priority_enum" AS ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT')`);
        await queryRunner.query(`ALTER TABLE "tasks"."tasks" ALTER COLUMN "priority" TYPE "tasks"."tasks_priority_enum" USING "priority"::"text"::"tasks"."tasks_priority_enum"`);
        await queryRunner.query(`DROP TYPE "tasks"."tasks_priority_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "tasks"."tasks_priority_enum_old" AS ENUM('LOW', 'MEDIUM', 'HIGH')`);
        await queryRunner.query(`ALTER TABLE "tasks"."tasks" ALTER COLUMN "priority" TYPE "tasks"."tasks_priority_enum_old" USING "priority"::"text"::"tasks"."tasks_priority_enum_old"`);
        await queryRunner.query(`DROP TYPE "tasks"."tasks_priority_enum"`);
        await queryRunner.query(`ALTER TYPE "tasks"."tasks_priority_enum_old" RENAME TO "tasks_priority_enum"`);
    }

}
