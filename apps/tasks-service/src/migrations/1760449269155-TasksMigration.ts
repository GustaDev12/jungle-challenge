import { MigrationInterface, QueryRunner } from "typeorm";

export class TasksMigration1760449269155 implements MigrationInterface {
    name = 'TasksMigration1760449269155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks"."tasks" DROP COLUMN "prazo"`);
        await queryRunner.query(`ALTER TABLE "tasks"."tasks" ADD "prazo" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks"."tasks" DROP COLUMN "prazo"`);
        await queryRunner.query(`ALTER TABLE "tasks"."tasks" ADD "prazo" TIMESTAMP NOT NULL`);
    }

}
