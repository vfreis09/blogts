import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import User from "../entities/user";
import Post from "../entities/post";
import Like from "../entities/like";

@Entity()
export default class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.comments, {
    nullable: false,
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Post, (post) => post.comments, {
    nullable: false,
    onDelete: "CASCADE",
  })
  post: Post;

  @OneToMany(() => Like, (like) => like.comment)
  likes: Like[];

  @Column("text")
  text: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public created_at: Date;
}
