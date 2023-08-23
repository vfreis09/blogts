import { Request, Response } from "express";
import AppDataSource from "../config/db";
import User from "../entities/user";
import Post from "../entities/post";
import Comment from "../entities/comment";
import Like from "../entities/like";
import setCounter from "../middleware/likeCount";

const userRepository = AppDataSource.getRepository(User);
const postRepository = AppDataSource.getRepository(Post);
const commentRepository = AppDataSource.getRepository(Comment);
const likeRepository = AppDataSource.getRepository(Like);

const likePost = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.findOneBy({
      id: req.session.user!.id,
    });

    const post = await postRepository.findOneBy({
      id: Number(req.params.postid),
    });

    const like = new Like();

    like.user = user!;
    like.post = post!;
    like.likeCount = setCounter(req.body.likeCount);

    await AppDataSource.manager.save(like);
    res.send("post liked");
  } catch (error) {
    console.log(error);
  }
};

const likeComment = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.findOneBy({
      id: req.session.user!.id,
    });

    const comment = await commentRepository.findOneBy({
      id: Number(req.params.commentid),
    });

    const like = new Like();

    like.user = user!;
    like.comment = comment!;
    like.likeCount = setCounter(req.body.likeCount);

    await AppDataSource.manager.save(like);
    res.send("comment liked");
  } catch (error) {
    console.log(error);
  }
};

const deleteLike = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.likeid);

    const like = await likeRepository.findOneBy({
      id: id,
    });

    await likeRepository.remove(like!);
    res.send("like deleted");
  } catch (error) {
    console.log(error);
  }
};

const likeController = {
  likePost,
  likeComment,
  deleteLike,
};

export default likeController;
