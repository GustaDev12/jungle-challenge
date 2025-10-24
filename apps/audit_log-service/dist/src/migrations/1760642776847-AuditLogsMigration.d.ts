import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AuditLogsMigration1760642776847 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
