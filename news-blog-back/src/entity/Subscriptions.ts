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

@Index("subscriptions_userId_channelId_key", ["channelId", "userId"], {
  unique: true,
})
@Index("subscriptions_pkey", ["id"], { unique: true })
@Entity("subscriptions", { schema: "public" })
export class Subscriptions {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("timestamp with time zone", { name: "createdAt" })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "updatedAt" })
  updatedAt: Date;

  @Column("integer", { name: "userId", nullable: true, unique: true })
  userId: number | null;

  @Column("integer", { name: "channelId", nullable: true, unique: true })
  channelId: number | null;

  @ManyToOne(() => Channels, (channels) => channels.subscriptions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "channelId", referencedColumnName: "id" }])
  channel: Channels;

  @ManyToOne(() => Users, (users) => users.subscriptions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: Users;
}
