import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import bcrypt from "bcrypt";
import Post from "../entities/post";
import Comment from "../entities/comment";
import Like from "../entities/like";

@Entity()
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index({ unique: true })
  @Column()
  username: string;

  @Column()
  password: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column()
  role: string;

  @OneToMany(() => Post, (post) => post.user, { nullable: false })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user, { nullable: false })
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user, { nullable: false })
  likes: Like[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

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
