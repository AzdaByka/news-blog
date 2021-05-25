import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Channels } from "./Channels";

@Index("statistics_channels_pkey", ["id"], { unique: true })
@Entity("statistics_channels", { schema: "public" })
export class StatisticsChannels {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "audience" })
  audience: number;

  @Column("integer", { name: "subscriptions" })
  subscriptions: number;

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
}
