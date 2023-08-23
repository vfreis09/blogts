import express from "express";
import { TypeormStore } from "connect-typeorm";
import ExpressSession from "express-session";

import "reflect-metadata";
import "dotenv/config";

import Session from "./entities/session";
import AppDataSource from "./config/db";

import userRouter from "./routers/userRouter";
import blogRouter from "./routers/blogRouter";

const app = express();

//Body parser(from node)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Database initialize
AppDataSource.initialize()
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));

const maxAge = 1000 * 60 * 60 * 24;

const sessionRepository = AppDataSource.getRepository(Session);

app.use(
  ExpressSession({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge },
    store: new TypeormStore({
      cleanupLimit: 2,
      limitSubquery: false,
      ttl: 86400,
    }).connect(sessionRepository),
  })
);

app.use(userRouter, blogRouter);
