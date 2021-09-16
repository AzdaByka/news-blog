import {MigrationInterface, QueryRunner} from "typeorm";

export class CommentTable1631700324767 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "comments" (
        "id" integer generated always as identity  constraint comments_pk
            primary key,
        "text" text NOT NULL,
        "like" int NOT NULL,
        "dislike"  int NOT NULL,        
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
