import {MigrationInterface, QueryRunner} from "typeorm";

export class UserComment1631701276727 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "userComment" (
        "id"serial not null  constraint userComment_pk
            primary key,
        "commentId" int
            constraint userComment_comment_fk
                references comments
                on update cascade on delete cascade,
        "userId" int
            constraint userComment_user_fk
                references users
                on update cascade on delete cascade,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "userComment"`);
    }

}
