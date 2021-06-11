import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Articles } from "./Articles";

@Index("statistics_articles_pkey", ["id"], { unique: true })
@Entity("statistics_articles", { schema: "public" })
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


  @Column("timestamp with time zone", { name: "createdAt" })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "updatedAt" })
  updatedAt: Date;

  @ManyToOne(() => Articles, (articles) => articles.statisticsArticles, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "articleId", referencedColumnName: "id" }])
  article: Articles;
}
