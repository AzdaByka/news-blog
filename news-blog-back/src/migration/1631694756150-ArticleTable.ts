import {MigrationInterface, QueryRunner} from "typeorm";

export class ArticleTable1631694756150 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "articles" (
        "id" integer generated always as identity  constraint articles_pk
            primary key,
        "title" character varying NOT NULL,
        "text" text NOT NULL,
        "imgs" text,
        "shortDescription" text NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "articles"`);
    }

}
