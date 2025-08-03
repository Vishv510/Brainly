import exprss from "express";

import { userMiddleware } from "../middleware/authMiddleware";
import { addContent, getUserContent, deleteUserContent, shareContentLink, getSharedContent } from "../controllers/userlogic";

const router= exprss.Router();

router.post("/content", userMiddleware, addContent);

router.get("/content", userMiddleware, getUserContent);

router.delete("/content", userMiddleware, deleteUserContent);

router.post("/brain/share", userMiddleware, shareContentLink);

router.get("/brain/:shareLink", getSharedContent);

export default router;