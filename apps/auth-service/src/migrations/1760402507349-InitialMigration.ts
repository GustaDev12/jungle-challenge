import { MigrationInterface, QueryRunner } from "typeorm";


export class InitialMigration1760402507349 implements MigrationInterface {
    name = 'InitialMigration1760402507349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users" SET SCHEMA "auth";`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth"."users" SET SCHEMA "public";`);
    }
}