import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ArticlesComments } from "./ArticlesComments";
import { ArticlesUserRate } from "./ArticlesUserRate";
import { Categories } from "./Categories";
import { ChannelArticles } from "./ChannelArticles";
import { StatisticsArticles } from "./StatisticsArticles";

@Index("articles_pk", ["id"], { unique: true })
@Entity("articles", { schema: "public" })
export class Articles {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "title" })
  title: string;

  @Column("text", { name: "text" })
  text: string;

  @Column("text", { name: "imgs", nullable: true })
  imgs: string | null;

  @Column("text", { name: "shortDescription" })
  shortDescription: string;

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
    (articlesComments) => articlesComments.article
  )
  articlesComments: ArticlesComments[];

  @OneToMany(
    () => ArticlesUserRate,
    (articlesUserRate) => articlesUserRate.article)
  articlesUserRates: ArticlesUserRate[];

  @OneToMany(() => Categories, (categories) => categories.article)
  categories: Categories[];

  @OneToMany(
    () => ChannelArticles,
    (channelArticles) => channelArticles.article
  )
  channelArticles: ChannelArticles[];

  @OneToMany(
    () => StatisticsArticles,
    (statisticsArticles) => statisticsArticles.article
  )
  statisticsArticles: StatisticsArticles[];
}
