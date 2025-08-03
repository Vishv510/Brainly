declare global{
    namespace Express{
        interface Request {
            userId? : string;
        }
    }
}

import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if(!JWT_SECRET){
    throw new Error("JWT_SECRET is not define in enviroment variables");
}

export const userMiddleware = ( req: Request, res: Response, next: NextFunction): void => {
    try{
        const authHeader = req.headers["authorization"];
        if(!authHeader){
            res.status(401).json({message: "Authorization header missing"});
            return ;
        }

        const token = authHeader;
        console.log(token);
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string};
        if (typeof decoded !== "object" || !("id" in decoded)) {
            res.status(401).json({ message: "Invalid token payload" });
            return;
        }
        req.userId = decoded.id;
        console.log("you are pass")
        next();
    }catch(error){
        console.error("Authentication error: ", error);

        if(error instanceof jwt.TokenExpiredError){
            res.status(401).json({message: "token expired"});
            return ;
        }
        if(error instanceof jwt.JsonWebTokenError){
            res.status(401).json({message: "Invalid token"});
            return ;
        }

        res.status(500).json({message: "Authentication failed"});
    }
}