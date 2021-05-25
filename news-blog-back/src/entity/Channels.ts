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

@Index("channels_pkey", ["id"], { unique: true })
@Entity("channels", { schema: "public" })
export class Channels {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("character varying", { name: "descriptions", length: 255 })
  descriptions: string;

  @Column("character varying", { name: "img_avatar", length: 255 })
  imgAvatar: string;

  @Column("timestamp with time zone", { name: "createdAt" })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "updatedAt" })
  updatedAt: Date;

  @OneToMany(
    () => ChannelArticles,
    (channelArticles) => channelArticles.channel
  )
  channelArticles: ChannelArticles[];

  @ManyToOne(() => Users, (users) => users.channels, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(
    () => StatisticsChannels,
    (statisticsChannels) => statisticsChannels.channel
  )
  statisticsChannels: StatisticsChannels[];

  @OneToMany(() => Subscriptions, (subscriptions) => subscriptions.channel)
  subscriptions: Subscriptions[];
}
