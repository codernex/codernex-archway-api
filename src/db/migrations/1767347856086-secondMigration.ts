import { MigrationInterface, QueryRunner } from "typeorm";

export class SecondMigration1767347856086 implements MigrationInterface {
    name = 'SecondMigration1767347856086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blogs" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "blogs" ADD "content" jsonb NOT NULL DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blogs" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "blogs" ADD "content" text NOT NULL`);
    }

}
