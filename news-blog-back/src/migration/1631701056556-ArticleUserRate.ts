import {MigrationInterface, QueryRunner} from "typeorm";

export class ArticleUserRate1631701056556 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "articlesUserRate" (
        "id"serial not null  constraint articlesUserRate_pk
            primary key,
        "articleId" int
            constraint articlesUserRate_article_fk
                references articles
                on update cascade on delete cascade,
        "userId" int
            constraint articlesUserRate_user_fk 
                references users
                on update cascade on delete cascade,
        "like" int,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "articlesUserRate"`);
    }
}
