import { Router } from "express";
import userController from "../controllers/userController";
import isAuthenticated from "../middleware/isAuth";

const router = Router();

router.get("/signup", userController.signupGet);
router.post("/signup", userController.signupPost);

router.get("/login", userController.loginGet);
router.post("/login", userController.loginPost);

router.put("/:id", isAuthenticated.userUpdateAuth, userController.updateUser);
router.get("/logout", userController.logout);

export default router;
