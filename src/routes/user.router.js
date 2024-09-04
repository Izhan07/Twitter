import { Router } from "express";
import { getUserCurrentProfile, loggedOutUser, loginUser, refreshAccessToken, resgiterUser, searchUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

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

    router.route("/login").post(loginUser)
    router.route("/logout").post(verifyJWT, loggedOutUser)
    router.route("/refresh-token").post(refreshAccessToken)
    router.route("/c/:username").get(verifyJWT, getUserCurrentProfile)
    router.route("/searchUser").get(verifyJWT, searchUser)

export default router