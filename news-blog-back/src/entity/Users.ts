import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ArticlesUserRate } from "./ArticlesUserRate";
import { Channels } from "./Channels";
import { StatisticsChannels } from "./StatisticsChannels";
import { Subscriptions } from "./Subscriptions";
import { UserComment } from "./UserComment";

@Index("user_pk", ["id"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "login", length: 40 })
  login: string;

  @Column("character varying", { name: "email", length: 40 })
  email: string;

  @Column("character varying", { name: "password" })
  password: string;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("character varying", { name: "surname" })
  surname: string;

  @Column("character varying", { name: "patronymic" })
  patronymic: string;

  @Column("character varying", { name: "tel" })
  tel: string;

  @Column("character varying", { name: "imgAvatar" })
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
    () => ArticlesUserRate,
    (articlesUserRate) => articlesUserRate.user
  )
  articlesUserRates: ArticlesUserRate[];

  @OneToMany(() => Channels, (channels) => channels.user)
  channels: Channels[];

  @OneToMany(
    () => StatisticsChannels,
    (statisticsChannels) => statisticsChannels.user
  )
  statisticsChannels: StatisticsChannels[];

  @OneToMany(() => Subscriptions, (subscriptions) => subscriptions.user)
  subscriptions: Subscriptions[];

  @OneToMany(() => UserComment, (userComment) => userComment.user)
  userComments: UserComment[];
}
