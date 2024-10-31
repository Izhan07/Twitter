import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getMessagedTo, getMessages, sendMessage } from "../controllers/message.controller.js";

const router = Router()
router.use(verifyJWT)
router.route("/:reciverId").post(sendMessage)
router.route("/:userId").get(getMessages)
router.route("/profile/users").get(getMessagedTo)
export default router;