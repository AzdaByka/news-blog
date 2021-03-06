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

@Index("channelarticles_pk", ["id"], { unique: true })
@Entity("channelArticles", { schema: "public" })
export class ChannelArticles {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "channelId", nullable: true, unique: true })
  channelId: number | null;


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

  @ManyToOne(() => Articles, (articles) => articles.channelArticles, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "ArticleId", referencedColumnName: "id" }])
  article: Articles;

  @ManyToOne(() => Channels, (channels) => channels.channelArticles, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "channelId", referencedColumnName: "id" }])
  channel: Channels;
}
