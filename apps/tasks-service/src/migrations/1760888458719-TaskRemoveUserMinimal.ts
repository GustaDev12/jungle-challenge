import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskRemoveUserMinimal1760888458719 implements MigrationInterface {
    name = 'TaskRemoveUserMinimal1760888458719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks"."comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks"."comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "tasks"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
