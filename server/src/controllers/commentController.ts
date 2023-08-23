import { Request, Response } from "express";
import AppDataSource from "../config/db";
import User from "../entities/user";
import Post from "../entities/post";
import Comment from "../entities/comment";

const userRepository = AppDataSource.getRepository(User);
const postRepository = AppDataSource.getRepository(Post);
const commentRepository = AppDataSource.getRepository(Comment);

const getComment = async (req: Request, res: Response) => {
  try {
    const comment = await commentRepository.findOneBy({
      id: Number(req.params.commentid),
    });

    res.send(comment);
  } catch (error) {
    console.log(error);
  }
};

const postComment = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.findOneBy({
      id: req.session.user!.id,
    });

    const post = await postRepository.findOneBy({
      id: Number(req.params.postid),
    });

    const comment = new Comment();

    comment.text = req.body.text;
    comment.user = user!;
    comment.post = post!;

    await AppDataSource.manager.save(comment);
    res.send("comment created");
  } catch (error) {
    console.log(error);
  }
};

const deleteComment = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.commentid);

    const comment = await commentRepository.findOneBy({
      id: id,
    });

    await commentRepository.remove(comment!);
    res.send("comment deleted");
  } catch (error) {
    console.log(error);
  }
};

const commentController = {
  getComment,
  postComment,
  deleteComment,
};

export default commentController;
