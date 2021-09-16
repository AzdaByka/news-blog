import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Articles } from "./Articles";
import { Users } from "./Users";

@Index("articlesuserrate_pk", ["id"], { unique: true })
@Entity("articlesUserRate", { schema: "public" })
export class ArticlesUserRate {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "like", nullable: true })
  like: number | null;

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

  @ManyToOne(() => Articles, (articles) => articles.articlesUserRates, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "id" }])
  article: Articles;

  @ManyToOne(() => Users, (users) => users.articlesUserRates, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
