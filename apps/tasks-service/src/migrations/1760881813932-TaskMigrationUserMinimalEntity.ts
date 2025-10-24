import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskMigrationUserMinimalEntity1760881813932 implements MigrationInterface {
    name = 'TaskMigrationUserMinimalEntity1760881813932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. CRIA A TABELA "USERS" (Passo que já existia)
        await queryRunner.query(`
            CREATE TABLE "tasks"."users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "username" character varying NOT NULL,
                "email" character varying NOT NULL,
                CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);

        // 2. PASSO CORRETIVO: POPULA "USERS" COM OS IDs REFERENCIADOS EM "COMMENTS"
        // Isso garante que todo userId em comments tenha um registro em users.
        await queryRunner.query(`
            INSERT INTO "tasks"."users" ("id", "username", "email")
            SELECT DISTINCT
                c."userId",
                'migrated_user_' || substr(c."userId"::text, 1, 8), -- Cria username único e temporário
                'migrated_' || substr(c."userId"::text, 1, 8) || '@example.com' -- Cria email único e temporário
            FROM "tasks"."comments" c
            WHERE c."userId" IS NOT NULL
            -- A cláusula ON CONFLICT não é estritamente necessária aqui se a tabela for nova e vazia, 
            -- mas é uma boa prática para evitar erros em cenários mais complexos.
            ON CONFLICT ("id") DO NOTHING;
        `);

        // 3. ADICIONA A CHAVE ESTRANGEIRA (Passo que estava falhando)
        // Agora, o banco de dados encontra o registro correspondente para o userId 
        // e a restrição é aplicada com sucesso.
        await queryRunner.query(`
            ALTER TABLE "tasks"."comments" 
            ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" 
            FOREIGN KEY ("userId") REFERENCES "tasks"."users"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    // A função down() não precisa de mudanças, pois ela lida com a remoção.
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks"."comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`DROP TABLE "tasks"."users"`);
    }
}