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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.signin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("../models/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const saltRound = 2;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    console.log("Signup called with:", username, password);
    try {
        const existingUser = yield db_1.UserModel.findOne({ username });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const encry = yield bcrypt_1.default.hash(password, saltRound);
        const newUser = yield db_1.UserModel.create({ username, password: encry });
        const token = jsonwebtoken_1.default.sign({ userId: newUser._id }, JWT_SECRET);
        res.status(200).json({
            messsage: "User Signed up successfully",
            token
        });
    }
    catch (error) {
        console.error("Signup error: ", error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    console.log("Signin called with:", username, password);
    const existingUser = yield db_1.UserModel.findOne({ username, password });
    try {
        const existingUser = yield db_1.UserModel.findOne({ username });
        if (!existingUser) {
            res.status(403).json({ message: "Incorrect credentials" });
            return;
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!passwordMatch) {
            res.status(403).json({ message: "Incorrect credential" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, JWT_SECRET);
        res.status(200).json({ token });
    }
    catch (error) {
        console.error("Signin error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.signin = signin;
