"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not define in enviroment variables");
}
const userMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            res.status(401).json({ message: "Authorization header missing" });
            return;
        }
        const token = authHeader;
        console.log(token);
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (typeof decoded !== "object" || !("id" in decoded)) {
            res.status(401).json({ message: "Invalid token payload" });
            return;
        }
        req.userId = decoded.id;
        console.log("you are pass");
        next();
    }
    catch (error) {
        console.error("Authentication error: ", error);
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            res.status(401).json({ message: "token expired" });
            return;
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            res.status(401).json({ message: "Invalid token" });
            return;
        }
        res.status(500).json({ message: "Authentication failed" });
    }
};
exports.userMiddleware = userMiddleware;
