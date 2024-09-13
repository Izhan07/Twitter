import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTweet, deleteTweet, getAllTweets, getFollowingTweets, getOwnerTweets, getUserTweets, updateTweet } from "../controllers/tweet.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { getSubscribedChannels } from "../middlewares/subscriber.middleware.js";

const router = Router()
router.use(verifyJWT)
router.route("/").post(
    upload.fields([
        {
            name: "tweetImage",
            maxCount: 1
        }
    ]),
    createTweet
)
router.route("/user/:userId").get(getUserTweets)
router.route("/:tweetId").patch(
    upload.fields([
        {
            name: "tweetImage",
            maxCount: 1
        }
    ]),
    updateTweet
)
router.route("/del/:tweetId").delete(deleteTweet)
router.route("/tweets").get(getAllTweets)
router.route("/fellowTweets/:accountId").get(getSubscribedChannels, getFollowingTweets)
router.route("/ownerTweets").get(getOwnerTweets)

export default router