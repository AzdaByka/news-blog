import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ArticlesComments } from "./ArticlesComments";
import { Categories } from "./Categories";
import { ChannelArticles } from "./ChannelArticles";
import { StatisticsArticles } from "./StatisticsArticles";

@Index("articles_pkey", ["id"], { unique: true })
@Entity("articles", { schema: "public" })
export class Articles {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("character varying", { name: "text", length: 255 })
  text: string;

  @Column("character varying", { name: "preview", length: 255 })
  preview: string;

  @Column("timestamp with time zone", { name: "createdAt" })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "updatedAt" })
  updatedAt: Date;

  @OneToMany(
    () => ArticlesComments,
    (articlesComments) => articlesComments.article
  )
  articlesComments: ArticlesComments[];

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
