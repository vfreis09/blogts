import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "../entities/user";
import Comment from "../entities/comment";
import Like from "../entities/like";

@Entity()
export default class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.posts, {
    nullable: false,
    onDelete: "CASCADE",
  })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post, { nullable: false })
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @Column()
  title: string;

  @Column("text")
  content: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  public updated_at: Date;
}
