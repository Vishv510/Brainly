import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { UserModel } from "../models/db";
import bcrypt from "bcrypt";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const saltRound = 2;

if(!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

const signup = async (req: Request, res: Response) : Promise<void> => {
    const username = req.body.username;
    const password = req.body.password;
    console.log("Signup called with:", username, password);
    try {
        const existingUser = await UserModel.findOne({ username });
        if(existingUser){
            res.status(400).json({message: "User already exists"});
            return ;
        }

        const encry = await bcrypt.hash(password, saltRound);

        const newUser = await UserModel.create({username, password: encry});

        const token = jwt.sign({userId: newUser._id}, JWT_SECRET);

        res.status(200).json({
            messsage: "User Signed up successfully",
            token
        });
    }catch(error){
        console.error("Signup error: ", error);
        res.status(500).json({
            message: "Internal server error",
        })
    }
};

const signin = async (req: Request, res: Response): Promise<void> => {
    const username = req.body.username;
    const password = req.body.password;
    console.log("Signin called with:", username, password);
    const existingUser = await UserModel.findOne({ username, password});

    try{
        const existingUser = await UserModel.findOne({username});

        if(!existingUser){
            res.status(403).json({ message: "Incorrect credentials" });
            return ;
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if(!passwordMatch){
            res.status(403).json({ message: "Incorrect credential" });
            return ;
        }

        const token = jwt.sign({ id: existingUser._id }, JWT_SECRET);
        
        res.status(200).json({ token });
    }catch(error){
        console.error("Signin error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export { signin, signup };