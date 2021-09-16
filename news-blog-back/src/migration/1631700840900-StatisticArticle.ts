import {MigrationInterface, QueryRunner} from "typeorm";

export class StatisticArticle1631700840900 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "statisticsArticles" (
        "id" integer generated always as identity  constraint statisticArticle_pk
            primary key,
        "CTR"  int NOT NULL,
        "shows"  int NOT NULL,
        "subscriptions"  int NOT NULL,
        "like"  int NOT NULL,
        "dislike"  int NOT NULL,
        "article_id" int
            constraint statisticArticle_fk
                references articles
                on update cascade on delete cascade,      
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "statisticsArticles"`);
    }


}
