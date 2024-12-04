import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const secretKey = process.env.SECRET_KEY || " ";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    
    const decoded = jwt.verify(header as string, secretKey)
    if (decoded) {
        if (typeof decoded === "string") {
            res.status(403).json({
                message: "You are not logged in"
            })
            return;    
        }
        req.userid = (decoded as JwtPayload).userid;
        next();
    } else {
        res.status(403).json({
            message: "You are not logged in"
        })
    }
}