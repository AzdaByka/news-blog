import {MigrationInterface, QueryRunner} from "typeorm";

export class subcription1631701591705 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "subscriptions" (
        "id"serial not null  constraint subscriptions_pk 
            primary key,
        "channel_id" int
            constraint subscriptions_channel_fk
                references channels
                on update cascade on delete cascade,
        "user_id" int
            constraint subscriptions_user_fk
                references users
                on update cascade on delete cascade,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "subscriptions"`);
    }


}
