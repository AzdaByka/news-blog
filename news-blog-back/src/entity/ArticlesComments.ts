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

@Index(
  "articles_comments_articleId_commentId_key",
  ["articleId", "commentId"],
  { unique: true }
)
@Index("articles_comments_pkey", ["id"], { unique: true })
@Entity("articles_comments", { schema: "public" })
export class ArticlesComments {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("timestamp with time zone", { name: "createdAt" })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "updatedAt" })
  updatedAt: Date;

  @Column("integer", { name: "articleId", nullable: true, unique: true })
  articleId: number | null;

  @Column("integer", { name: "commentId", nullable: true, unique: true })
  commentId: number | null;

  @ManyToOne(() => Articles, (articles) => articles.articlesComments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "articleId", referencedColumnName: "id" }])
  article: Articles;

  @ManyToOne(() => Comments, (comments) => comments.articlesComments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "commentId", referencedColumnName: "id" }])
  comment: Comments;
}
