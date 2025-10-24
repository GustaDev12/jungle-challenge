import { MigrationInterface, QueryRunner } from "typeorm";

export class TasksMigration1760452820615 implements MigrationInterface {
    name = 'TasksMigration1760452820615'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE "tasks"."tasks" DROP COLUMN "prazo"`);
        await queryRunner.query(`ALTER TABLE "tasks"."tasks" ADD "prazo" TIMESTAMP NULL`);
        await queryRunner.query(`UPDATE "tasks"."tasks" SET "prazo" = NOW() WHERE "prazo" IS NULL`);
        await queryRunner.query(`ALTER TABLE "tasks"."tasks" ALTER COLUMN "prazo" SET NOT NULL`);


        await queryRunner.query(`ALTER TABLE "tasks"."tasks" DROP COLUMN "priority"`);
        await queryRunner.query(`CREATE TYPE "tasks"."tasks_priority_enum" AS ENUM('LOW', 'MEDIUM', 'HIGH')`);
        await queryRunner.query(`ALTER TABLE "tasks"."tasks" ADD "priority" "tasks"."tasks_priority_enum" NULL`);
        await queryRunner.query(`UPDATE "tasks"."tasks" SET "priority" = 'HIGH' WHERE "priority" = 'LOW'`);
        await queryRunner.query(`ALTER TABLE "tasks"."tasks" ALTER COLUMN "priority" SET NOT NULL`);

        await queryRunner.query(`ALTER TABLE "tasks"."tasks" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "tasks"."tasks_status_enum" AS ENUM('TODO', 'IN_PROGRESS', 'REVIEW', 'DONE')`);
        await queryRunner.query(`ALTER TABLE "tasks"."tasks" ADD "status" "tasks"."tasks_status_enum" NULL`);
        await queryRunner.query(`UPDATE "tasks"."tasks" SET "status" = 'TODO' WHERE "status" IS NULL`);
        await queryRunner.query(`ALTER TABLE "tasks"."tasks" ALTER COLUMN "status" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks"."tasks" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "tasks"."tasks_status_enum"`);
        await queryRunner.query(`ALTER TABLE "tasks"."tasks" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tasks"."tasks" DROP COLUMN "priority"`);
        await queryRunner.query(`DROP TYPE "tasks"."tasks_priority_enum"`);
        await queryRunner.query(`ALTER TABLE "tasks"."tasks" ADD "priority" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tasks"."tasks" DROP COLUMN "prazo"`);
        await queryRunner.query(`ALTER TABLE "tasks"."tasks" ADD "prazo" character varying NOT NULL`);
    }

}
