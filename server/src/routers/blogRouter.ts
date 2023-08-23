import { Router } from "express";
import postController from "../controllers/postController";
import commentController from "../controllers/commentController";
import likeController from "../controllers/likeController";
import isAuthenticated from "../middleware/isAuth";

const router = Router();

//Posts
router.get("/", isAuthenticated.defaultAuth, postController.getProfile);
router.get(
  "/post/:postid",
  isAuthenticated.defaultAuth,
  postController.getPostbyId
);
router.post("/post", isAuthenticated.defaultAuth, postController.postPost);
router.put(
  "/post/:postid",
  isAuthenticated.defaultAuth,
  postController.updatePost
);
router.delete(
  "/post/:postid",
  isAuthenticated.defaultAuth,
  postController.deletePost
);

//Comments
router.get(
  "/post/:postid/comment/:commentid",
  isAuthenticated.defaultAuth,
  commentController.getComment
);
router.post(
  "/post/:postid/comment",
  isAuthenticated.defaultAuth,
  commentController.postComment
);
router.delete(
  "/post/:postid/comment/:commentid",
  isAuthenticated.defaultAuth,
  commentController.deleteComment
);

//Likes
router.post(
  "/post/:postid/like",
  isAuthenticated.defaultAuth,
  likeController.likePost
);
router.post(
  "/post/:postid/comment/:commentid/like",
  isAuthenticated.defaultAuth,
  likeController.likeComment
);
router.delete(
  "/post/:postid/like/:likeid",
  isAuthenticated.defaultAuth,
  likeController.deleteLike
);
router.delete(
  "/post/:postid/comment/:commentid/like/:likeid",
  isAuthenticated.defaultAuth,
  likeController.deleteLike
);

export default router;
