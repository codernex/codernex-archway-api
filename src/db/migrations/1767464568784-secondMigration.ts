import { MigrationInterface, QueryRunner } from "typeorm";

export class SecondMigration1767464568784 implements MigrationInterface {
    name = 'SecondMigration1767464568784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fileName" character varying NOT NULL, "url" character varying NOT NULL, "key" character varying NOT NULL, "mimeType" character varying, "size" bigint, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "media"`);
    }

}
