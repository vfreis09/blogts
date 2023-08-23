import { Request, Response, NextFunction } from "express";

declare module "express-session" {
  export interface SessionData {
    user: {
      id: string;
      username: string;
      email: string;
      role: string;
    };
  }
}

function defaultAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user) {
    res.status(401).send("You are not authorized to view this resource");
  } else {
    next();
  }
}

function userUpdateAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session.user!.id != req.params.id) {
    res.status(401).send("You are not authorized to change other users info");
  } else {
    next();
  }
}

const isAuthenticated = {
  defaultAuth,
  userUpdateAuth,
};

export default isAuthenticated;
