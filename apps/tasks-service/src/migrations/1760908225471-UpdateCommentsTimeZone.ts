import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCommentsTimeZone1760908225471 implements MigrationInterface {
    name = 'UpdateCommentsTimeZone1760908225471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks"."comments" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "tasks"."comments" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks"."comments" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "tasks"."comments" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
