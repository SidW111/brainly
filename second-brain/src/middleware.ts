import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const JWT_PASS = "SID@2003";
export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers["authorization"];
  const decodedToken = jwt.verify(header as string,JWT_PASS)
  if(decodedToken){
    //@ts-ignore
    req.userId = decodedToken.id;
    console.log(decodedToken);
    next();
  }else{
    res.status(403).json({
        msg:"You are not logged in"
    })
  }
};
