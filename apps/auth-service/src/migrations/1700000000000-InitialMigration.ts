import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1700000000000 implements MigrationInterface {
    name = 'InitialMigration1700000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Comando para criar o schema, garantindo que não falhe se já existir
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "auth";`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Comando para remover o schema, se necessário
        await queryRunner.query(`DROP SCHEMA "auth" CASCADE;`);
    }
}