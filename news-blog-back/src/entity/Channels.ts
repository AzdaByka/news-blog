import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ChannelArticles } from "./ChannelArticles";
import { Users } from "./Users";
import { StatisticsChannels } from "./StatisticsChannels";
import { Subscriptions } from "./Subscriptions";

@Index("channel_pk", ["id"], { unique: true })
@Entity("channels", { schema: "public" })
export class Channels {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", length: 40 })
  name: string;

  @Column("character varying", { name: "descriptions" })
  descriptions: string;

  @Column("text", { name: "img_avatar" })
  imgAvatar: string;

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
    () => ChannelArticles,
    (channelArticles) => channelArticles.channel
  )
  channelArticles: ChannelArticles[];

  @ManyToOne(() => Users, (users) => users.channels, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(
    () => StatisticsChannels,
    (statisticsChannels) => statisticsChannels.channel
  )
  statisticsChannels: StatisticsChannels[];

  @OneToMany(() => Subscriptions, (subscriptions) => subscriptions.channel)
  subscriptions: Subscriptions[];
}
