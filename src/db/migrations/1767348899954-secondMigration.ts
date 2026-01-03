import { MigrationInterface, QueryRunner } from "typeorm";

export class SecondMigration1767348899954 implements MigrationInterface {
    name = 'SecondMigration1767348899954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blogs" ALTER COLUMN "slug" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blogs" ALTER COLUMN "excerpt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blogs" ALTER COLUMN "featuredImage" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blogs" ALTER COLUMN "featuredImage" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blogs" ALTER COLUMN "excerpt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blogs" ALTER COLUMN "slug" SET NOT NULL`);
    }

}
