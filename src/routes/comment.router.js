import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addComment, deleteComment, getTweetComments, updateComment } from "../controllers/comment.controller.js";

const router = Router()
router.use(verifyJWT)
router.route("/:tweetId").post(addComment).get(getTweetComments)
router.route("/:commentId").patch(updateComment).delete(deleteComment)

export default router