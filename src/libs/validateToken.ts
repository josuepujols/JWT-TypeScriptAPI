import { Request, Response, NextFunction } from "express";
import { IPayLoad } from "../interfaces/payload";
import jwt from "jsonwebtoken";

export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.header("auth-token");
    if (!token) res.status(401).json({ message: "Access Denied" });
    //get payload of the result
    const payload: IPayLoad = jwt.verify(token as string, process.env.TOKEN_SECRET || "TOKEN_TEST") as IPayLoad;
    req.userId = payload._id;
    next();
}