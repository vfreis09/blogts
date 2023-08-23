import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config";
import User from "../entities/user";
import Session from "../entities/session";
import Post from "../entities/post";
import Comment from "../entities/comment";
import Like from "../entities/like";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DB_NAME,
  entities: [User, Session, Post, Comment, Like],
  synchronize: true,
  logging: false,
});

export default AppDataSource;
