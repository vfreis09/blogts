import { Request, Response } from "express";
import AppDataSource from "../config/db";
import bcrypt from "bcrypt";
import User from "../entities/user";

const userRepository = AppDataSource.getRepository(User);

const signupGet = (req: Request, res: Response) => {
  res.send("signup page");
};

const signupPost = (req: Request, res: Response) => {
  const user = new User();

  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;
  user.role = req.body.role;

  AppDataSource.manager
    .save(user)
    .then(() => {
      console.log("user created");
      res.redirect("/login");
    })
    .catch((err) => console.log(err));
};

const loginGet = (req: Request, res: Response) => {
  res.send("login page");
};

const loginPost = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.findOneBy({
      email: req.body.email,
    });

    req.session.user = user!;

    await bcrypt.compare(req.body.password, user!.password);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const user = await userRepository.findOneBy({
      id: id,
    });

    user!.username = req.body.username;
    user!.password = req.body.password;
    user!.email = req.body.email;
    user!.role = req.body.role;

    await AppDataSource.manager.save(user);
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};

const logout = (req: Request, res: Response) => {
  req.session.destroy((error) => {
    console.log(error);
  });

  res.clearCookie("connect.sid", {
    httpOnly: true,
    path: "/",
    secure: false,
  });

  res.redirect("/login");
};

const userController = {
  signupGet,
  signupPost,
  loginGet,
  loginPost,
  updateUser,
  logout,
};

export default userController;
