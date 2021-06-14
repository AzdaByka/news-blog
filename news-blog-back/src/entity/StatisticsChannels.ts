import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Channels } from "./Channels";
import {Users} from "./Users";
import {ArticlesUserRate} from "./ArticleUserRate";

@Index("statistics_channels_pkey", ["id"], { unique: true })
@Entity("statistics_channels", { schema: "public" })
export class StatisticsChannels {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "channelId", nullable: true, unique: true })
  channelId: number | null;

  @Column("integer", { name: "userId", nullable: true, unique: true })
  userId: number | null;

  @Column("timestamp with time zone", { name: "createdAt" })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "updatedAt" })
  updatedAt: Date;

  @ManyToOne(() => Channels, (channels) => channels.statisticsChannels, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "channelId", referencedColumnName: "id" }])
  channel: Channels;

  @ManyToOne(() => Users, (users) => users.statisticsChannels, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: Users;

}
