import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ArticlesComments } from "./ArticlesComments";
import { UserComment } from "./UserComment";

@Index("comments_pk", ["id"], { unique: true })
@Entity("comments", { schema: "public" })
export class Comments {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "text" })
  text: string;

  @Column("integer", { name: "like" })
  like: number;

  @Column("integer", { name: "dislike" })
  dislike: number;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @Column("timestamp without time zone", {
    name: "updated_at",
    default: () => "now()",
  })
  updatedAt: Date;

  @OneToMany(
    () => ArticlesComments,
    (articlesComments) => articlesComments.comment
  )
  articlesComments: ArticlesComments[];

  @OneToMany(() => UserComment, (userComment) => userComment.comment)
  userComments: UserComment[];
}
