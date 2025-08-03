"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const userlogic_1 = require("../controllers/userlogic");
const router = express_1.default.Router();
router.post("/content", authMiddleware_1.userMiddleware, userlogic_1.addContent);
router.get("/content", authMiddleware_1.userMiddleware, userlogic_1.getUserContent);
router.delete("/content", authMiddleware_1.userMiddleware, userlogic_1.deleteUserContent);
router.post("/brain/share", authMiddleware_1.userMiddleware, userlogic_1.shareContentLink);
router.get("/brain/:shareLink", userlogic_1.getSharedContent);
exports.default = router;
