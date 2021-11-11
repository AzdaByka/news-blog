import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Channels } from "./Channels";
import { Users } from "./Users";

@Index("statisticschannels_pk", ["id"], { unique: true })
@Entity("statisticsChannels", { schema: "public" })
export class StatisticsChannels {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "channelId", nullable: true, unique: true })
  channelId: number | null;

  @Column("integer", { name: "userId", nullable: true, unique: true })
  userId: number | null;

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

  @ManyToOne(() => Channels, (channels) => channels.statisticsChannels, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "channelId", referencedColumnName: "id" }])
  channel: Channels;

  @ManyToOne(() => Users, (users) => users.statisticsChannels, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: Users;
}
