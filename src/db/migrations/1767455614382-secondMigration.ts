import { MigrationInterface, QueryRunner } from "typeorm";

export class SecondMigration1767455614382 implements MigrationInterface {
    name = 'SecondMigration1767455614382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ADD "content" jsonb NOT NULL DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "content"`);
    }

}
