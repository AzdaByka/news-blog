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

@Index("subscriptions_pk", ["id"], { unique: true })
@Entity("subscriptions", { schema: "public" })
export class Subscriptions {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

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

  @ManyToOne(() => Channels, (channels) => channels.subscriptions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "channel_id", referencedColumnName: "id" }])
  channel: Channels;

  @ManyToOne(() => Users, (users) => users.subscriptions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
