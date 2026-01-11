import { MigrationInterface, QueryRunner } from "typeorm";

export class V0021768120351057 implements MigrationInterface {
    name = 'V0021768120351057'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "api_keys" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "apiKey" character varying NOT NULL, "expiryDate" TIMESTAMP, "origin" character varying NOT NULL, "scope" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5c8a79801b44bd27b79228e1dad" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "api_keys"`);
    }

}
