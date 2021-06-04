import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Channels } from "./Channels";
import { Subscriptions } from "./Subscriptions";
import { UserComments } from "./UserComments";

@Index("users_pkey", ["id"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "login", length: 200 })
  login: string;

  @Column("character varying", { name: "email", length: 200 })
  email: string;

  @Column("character varying", { name: "password"})
  password: string;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("character varying", { name: "surname", length: 255 })
  surname: string;

  @Column("character varying", { name: "patronymic", length: 255 })
  patronymic: string;

  @Column("integer", { name: "tel" })
  tel: number;

  @Column("character varying", { name: "img_avatar", length: 255 })
  imgAvatar: string;

  @Column("timestamp with time zone", { name: "createdAt" })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "updatedAt" })
  updatedAt: Date;

  @OneToMany(() => Channels, (channels) => channels.user)
  channels: Channels[];

  @OneToMany(() => Subscriptions, (subscriptions) => subscriptions.user)
  subscriptions: Subscriptions[];

  @OneToMany(() => UserComments, (userComments) => userComments.user)
  userComments: UserComments[];
}
