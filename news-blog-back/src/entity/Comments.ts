import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ArticlesComments } from "./ArticlesComments";
import { UserComments } from "./UserComments";

@Index("comments_pkey", ["id"], { unique: true })
@Entity("comments", { schema: "public" })
export class Comments {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "text", length: 255 })
  text: string;

  @Column("integer", { name: "like" })
  like: number;

  @Column("integer", { name: "dislike" })
  dislike: number;

  @Column("timestamp with time zone", { name: "createdAt" })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "updatedAt" })
  updatedAt: Date;

  @OneToMany(
    () => ArticlesComments,
    (articlesComments) => articlesComments.comment
  )
  articlesComments: ArticlesComments[];

  @OneToMany(() => UserComments, (userComments) => userComments.comment)
  userComments: UserComments[];
}
