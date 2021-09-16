import {MigrationInterface, QueryRunner} from "typeorm";

export class ChannelArticle1631701567120 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "channelArticles" (
        "id"serial not null  constraint channelArticles_pk
            primary key,
        "channel_id" int
            constraint channelArticles_channel_fk
                references channels
                on update cascade on delete cascade,
        "Article_id" int
            constraint channelArticles_article_fk
                references articles
                on update cascade on delete cascade,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "channelArticles"`);
    }

}
