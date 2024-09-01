import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { commentLike, getLikedTweets, toggleTweetLike, tweetLikeCounts } from "../controllers/like.controller.js";


const router = Router()
router.use(verifyJWT)

router.route("/toggleL/t/:tweetId").post(toggleTweetLike)
router.route("/tweets").get(getLikedTweets)
router.route("/toggle/c/:commentId").post(commentLike)
router.route("/count/:tweetId").get(tweetLikeCounts)

export default router