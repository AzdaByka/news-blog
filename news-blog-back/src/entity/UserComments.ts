import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comments } from "./Comments";
import { Users } from "./Users";

@Index("user_comments_userId_commentId_key", ["commentId", "userId"], {
  unique: true,
})
@Index("user_comments_pkey", ["id"], { unique: true })
@Entity("user_comments", { schema: "public" })
export class UserComments {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("timestamp with time zone", { name: "createdAt" })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "updatedAt" })
  updatedAt: Date;

  @Column("integer", { name: "userId", nullable: true, unique: true })
  userId: number | null;

  @Column("integer", { name: "commentId", nullable: true, unique: true })
  commentId: number | null;

  @ManyToOne(() => Comments, (comments) => comments.userComments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "commentId", referencedColumnName: "id" }])
  comment: Comments;

  @ManyToOne(() => Users, (users) => users.userComments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: Users;
}
