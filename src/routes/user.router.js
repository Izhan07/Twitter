import { Router } from "express";
import { changeCurrentPassword, getUserCurrentProfile, loggedOutUser, loginUser, refreshAccessToken, resgiterUser, searchUser, updateAccountDetails, updateCoverImage, updateUserAvatar } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getUserTweets } from "../controllers/tweet.controller.js";

const router = Router();

router.route("/register" ).post(
    upload.fields([
      {
        name: "avatar",
        maxCount: 1
      },
      {
        name: "coverimage",
        maxCount: 1
      }
    ]),
    resgiterUser)
    router.route("/CoverUpdate").patch(verifyJWT,
      upload.fields([
        {
          name: "coverimage",
          maxCount: 1
        }
      ]),
    updateCoverImage)
    router.route("/AvatarUpdate").patch(verifyJWT,
      upload.fields([
        {
          name: "avatar",
          maxCount: 1
        }
      ]),
    updateUserAvatar)
    router.route("/details").patch(verifyJWT, updateAccountDetails)
    router.route("/changePassword").patch(verifyJWT, changeCurrentPassword)
    router.route("/login").post(loginUser)
    router.route("/logout").post(verifyJWT, loggedOutUser)
    router.route("/refresh-token").post(refreshAccessToken)
    router.route("/c/:username").get(verifyJWT, getUserCurrentProfile)
    router.route("/searchUser").post(verifyJWT, searchUser)

export default router