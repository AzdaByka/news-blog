import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Articles } from "./Articles";
import { Channels } from "./Channels";

@Index("channel_articles_channelId_articleId_key", ["articleId", "channelId"], {
  unique: true,
})
@Index("channel_articles_pkey", ["id"], { unique: true })
@Entity("channel_articles", { schema: "public" })
export class ChannelArticles {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("timestamp with time zone", { name: "createdAt" })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "updatedAt" })
  updatedAt: Date;

  @Column("integer", { name: "channelId", nullable: true, unique: true })
  channelId: number | null;

  @Column("integer", { name: "articleId", nullable: true, unique: true })
  articleId: number | null;

  @ManyToOne(() => Articles, (articles) => articles.channelArticles, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "articleId", referencedColumnName: "id" }])
  article: Articles;

  @ManyToOne(() => Channels, (channels) => channels.channelArticles, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "channelId", referencedColumnName: "id" }])
  channel: Channels;
}
