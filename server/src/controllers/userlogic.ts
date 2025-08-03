import { Request, Response } from "express";
import { ContentModel, LinkModel, UserModel } from "../models/db";
import { random } from "../utils/random_name";

const addContent = async (req : Request, res: Response) => {
    try{
        const link = req.body.link;
        const type = req.body.type;
        const description = req.body.description;
        const title = req.body.title;

        const content = await ContentModel.create({
            title,
            link,
            type,
            description,
            userId: req.userId,
            tags: [],
        });
    
        res.json({message: "Content Added"});
    }catch (error: any){
        res.status(500).json({
            error: error.message
        });
    }
};

const getUserContent = async (req : Request, res: Response) => {
    try{
        const userId = req.userId;
        const searchQuery = req.query.search as string;

        const filter : any = {userId};

        if(searchQuery){
            filter.title = {$regex: searchQuery, $option: "i"}; // case-insensitive search
        }

        const content = await ContentModel.find(filter).populate("userId", "username");

        res.json({content});
    }catch(error: any){
        res.status(500).json({
            error: error.message
        });
    }
};

const deleteUserContent = async ( req : Request, res : Response) => {
    try{
        const contentId = req.body.Id;
        const userId = req.userId;
        await ContentModel.deleteOne({
            _id: contentId,
            userId
        });

        res.json({
            message: "deleted content"
        });
    }catch( error : any){
        res.status(500).json({
            error: error.message
        });
    }
};

const shareContentLink = async (req: Request, res: Response) => {
    const { share } = req.body;

    if(share) {
        const existingLink = await LinkModel.findOne({
            userId: req.userId,
        });

        if(existingLink){
            res.json({
                hash: existingLink.hash 
            });
            return ;
        }

        const hash = random(10);

        await LinkModel.create({
            userId: req.userId,
            hash
        });

        res.json({ hash });
    }else{
        await LinkModel.deleteOne({ userId: req.userId });
        
        res.json({ message: "Removed Link" });
    }
}

const getSharedContent = async (req: Request, res: Response) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({ hash });
    if(!link) {
        res.status(404).json({ message : "Invalid share link" });
        return ;
    }

    const content = await ContentModel.find({
        userId: link.userId,
    });

    const user = await UserModel.findOne({
        _id: link.userId
    });

    if(!user){
        res.status(404).json({
            message: "User not found"
        });
        return ;
    }

    res.json({
        username: user.username,
        content,
    });
};

export { addContent, getUserContent, deleteUserContent, shareContentLink, getSharedContent};