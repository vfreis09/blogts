import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  Column,
} from "typeorm";
import User from "../entities/user";
import Post from "../entities/post";
import Comment from "../entities/comment";

@Entity()
@Unique(["userId", "postId"])
@Unique(["userId", "commentId"])
export default class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column({ nullable: true })
  postId: number;

  @Column({ nullable: true })
  commentId: number;

  @Column()
  likeCount: number;

  @ManyToOne(() => User, (user) => user.likes, {
    nullable: false,
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Post, (post) => post.likes, { onDelete: "CASCADE" })
  post: Post;

  @ManyToOne(() => Comment, (comment) => comment.likes, { onDelete: "CASCADE" })
  comment: Comment;
}
