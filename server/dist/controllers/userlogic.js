"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSharedContent = exports.shareContentLink = exports.deleteUserContent = exports.getUserContent = exports.addContent = void 0;
const db_1 = require("../models/db");
const random_name_1 = require("../utils/random_name");
const addContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const link = req.body.link;
        const type = req.body.type;
        const description = req.body.description;
        const title = req.body.title;
        const content = yield db_1.ContentModel.create({
            title,
            link,
            type,
            description,
            userId: req.userId,
            tags: [],
        });
        res.json({ message: "Content Added" });
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
exports.addContent = addContent;
const getUserContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const searchQuery = req.query.search;
        const filter = { userId };
        if (searchQuery) {
            filter.title = { $regex: searchQuery, $option: "i" }; // case-insensitive search
        }
        const content = yield db_1.ContentModel.find(filter).populate("userId", "username");
        res.json({ content });
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
exports.getUserContent = getUserContent;
const deleteUserContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contentId = req.body.Id;
        const userId = req.userId;
        yield db_1.ContentModel.deleteOne({
            _id: contentId,
            userId
        });
        res.json({
            message: "deleted content"
        });
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
exports.deleteUserContent = deleteUserContent;
const shareContentLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { share } = req.body;
    if (share) {
        const existingLink = yield db_1.LinkModel.findOne({
            userId: req.userId,
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = (0, random_name_1.random)(10);
        yield db_1.LinkModel.create({
            userId: req.userId,
            hash
        });
        res.json({ hash });
    }
    else {
        yield db_1.LinkModel.deleteOne({ userId: req.userId });
        res.json({ message: "Removed Link" });
    }
});
exports.shareContentLink = shareContentLink;
const getSharedContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.LinkModel.findOne({ hash });
    if (!link) {
        res.status(404).json({ message: "Invalid share link" });
        return;
    }
    const content = yield db_1.ContentModel.find({
        userId: link.userId,
    });
    const user = yield db_1.UserModel.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(404).json({
            message: "User not found"
        });
        return;
    }
    res.json({
        username: user.username,
        content,
    });
});
exports.getSharedContent = getSharedContent;
