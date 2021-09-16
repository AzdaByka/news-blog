import {MigrationInterface, QueryRunner} from "typeorm";

export class ArticleComments1631695249044 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "articlesComments" (
        "id" serial not null constraint articlesComments_pk primary key,
        "article_id" int
            constraint articlesComments_article_fk
                references articles
                on update cascade on delete cascade,
        "comment_id" int
            constraint articlesComments_comment_fk
                references comments
                on update cascade on delete cascade,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "articlesComments"`);
    }

}
