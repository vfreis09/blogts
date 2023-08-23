import { Request, Response } from "express";
import AppDataSource from "../config/db";
import User from "../entities/user";
import Post from "../entities/post";

const userRepository = AppDataSource.getRepository(User);
const postRepository = AppDataSource.getRepository(Post);

const getProfile = (req: Request, res: Response) => {
  postRepository
    .find()
    .then((post) => res.send(post))
    .catch((err) => console.log(err));
};

const getPostbyId = (req: Request, res: Response) => {
  postRepository
    .findOneBy({
      id: Number(req.params.postid),
    })
    .then((post) => res.send(post))
    .catch((err) => console.log(err));
};

const postPost = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.findOneBy({
      id: req.session.user!.id,
    });

    const post = new Post();

    post.title = req.body.title;
    post.content = req.body.content;
    post.user = user!;

    await AppDataSource.manager.save(post);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await postRepository.findOneBy({
      id: Number(req.params.postid),
    });

    post!.title = req.body.title;
    post!.content = req.body.content;

    await postRepository.save(post!);
    res.send(post);
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await postRepository.findOneBy({
      id: Number(req.params.postid),
    });

    await postRepository.remove(post!);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const blogController = {
  getProfile,
  getPostbyId,
  postPost,
  updatePost,
  deletePost,
};

export default blogController;
