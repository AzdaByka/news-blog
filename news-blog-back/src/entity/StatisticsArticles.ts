import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Articles } from "./Articles";

@Index("statisticarticle_pk", ["id"], { unique: true })
@Entity("statisticsArticles", { schema: "public" })
export class StatisticsArticles {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "CTR" })
  ctr: number;

  @Column("integer", { name: "shows" })
  shows: number;

  @Column("integer", { name: "subscriptions" })
  subscriptions: number;

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

  @ManyToOne(() => Articles, (articles) => articles.statisticsArticles, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "id" }])
  article: Articles;
}
