import {MigrationInterface, QueryRunner} from "typeorm";

export class CategoriesTable1631700684945 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "categories" (
        "id" integer generated always as identity  constraint categories_pk
            primary key,
        "name"  character varying NOT NULL,
        "articleId" int
            constraint categories_article_fk
                references articles
                on update cascade on delete cascade,      
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
