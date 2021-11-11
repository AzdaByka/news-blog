import {MigrationInterface, QueryRunner} from "typeorm";

export class ChannelTable1631701413134 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "channels" (
        "id" integer generated always as identity  constraint channel_pk
            primary key,
        "name" character varying(40) NOT NULL,
        "descriptions" character varying NOT NULL,
        "img_avatar" text NOT NULL,
        "userId" int
            constraint userComment_user_fk
                references users
                on update cascade on delete cascade,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "channels"`);
    }

}
