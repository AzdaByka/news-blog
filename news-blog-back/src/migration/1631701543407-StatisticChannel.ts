import {MigrationInterface, QueryRunner} from "typeorm";

export class StatisticChannel1631701543407 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "statisticsChannels" (
        "id"serial not null  constraint statisticsChannels_pk
            primary key,
        "channelId" int
            constraint statisticsChannels_channel_fk
                references channels
                on update cascade on delete cascade,
        "userId" int
            constraint statisticsChannels_user_fk
                references users
                on update cascade on delete cascade,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "statisticsChannels"`);
    }

}
