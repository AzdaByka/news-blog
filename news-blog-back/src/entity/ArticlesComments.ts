import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Articles } from "./Articles";
import { Comments } from "./Comments";

@Index("articlescomments_pk", ["id"], { unique: true })
@Entity("articlesComments", { schema: "public" })
export class ArticlesComments {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

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

  @ManyToOne(() => Articles, (articles) => articles.articlesComments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "id" }])
  article: Articles;

  @ManyToOne(() => Comments, (comments) => comments.articlesComments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "comment_id", referencedColumnName: "id" }])
  comment: Comments;
}
