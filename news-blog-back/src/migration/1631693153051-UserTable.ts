import {MigrationInterface, QueryRunner} from "typeorm";

export class UserTable1631693153051 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "users" (
        "id" integer generated always as identity  constraint user_pk
            primary key,
        "login" character varying(40) NOT NULL,
        "email" character varying(40) NOT NULL,
        "password" character varying NOT NULL,
        "name" character varying NOT NULL,
        "surname" character varying NOT NULL,
        "patronymic" character varying NOT NULL,
        "tel" character varying NOT NULL,
        "imgAvatar" character varying NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
