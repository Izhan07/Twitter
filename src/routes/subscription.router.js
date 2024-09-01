import { Router } from "express";
import {  getUserFollowings, getUserSubscriber, toggleSubscribe } from "../controllers/subscription.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { getSubscribedChannels, getUserChannelSubscribers } from "../middlewares/subscriber.middleware.js";

const router = Router()
router.route("/c/:accountName").post(verifyJWT, toggleSubscribe)
router.route("/u/:accountId").get(verifyJWT, getUserChannelSubscribers, getUserSubscriber )
router.route("/f/:accountId").get(verifyJWT, getSubscribedChannels, getUserFollowings )

export default router