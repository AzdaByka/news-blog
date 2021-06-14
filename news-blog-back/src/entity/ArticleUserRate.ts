import {
    Column,
    Entity,
    Index, JoinColumn, ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { ArticlesComments } from "./ArticlesComments";
import { Categories } from "./Categories";
import { ChannelArticles } from "./ChannelArticles";
import { StatisticsArticles } from "./StatisticsArticles";
import {Articles} from "./Articles";
import {Comments} from "./Comments";
import {Users} from "./Users";


@Index(
    "article_user_rate_articleId_userId_key",
    ["articleId", "userId"],
    { unique: true }
)
@Index("article_user_rate_pkey", ["id"], { unique: true })
@Entity("article_user_rate", { schema: "public" })
export class ArticlesUserRate {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;

    @Column("integer", { name: "like", nullable: true, unique: true })
    like: number | null;

    @Column("integer", { name: "articleId", nullable: true, unique: true })
    articleId: number | null;

    @Column("integer", { name: "userId", nullable: true, unique: true })
    userId: number | null;

    @Column("timestamp with time zone", { name: "createdAt" })
    createdAt: Date;

    @Column("timestamp with time zone", { name: "updatedAt" })
    updatedAt: Date;

    @ManyToOne(() => Articles, (articles) => articles.articlesUserRate, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "articleId", referencedColumnName: "id" }])
    article: Articles;

    @ManyToOne(() => Users, (users) => users.articlesUserRate, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
    user: Users;
}
