import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getStory, uploadStory, userStory } from "../controllers/story.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()
router.use(verifyJWT)
router.route("/upload").post(
    upload.fields([
        {
            name: "story",
            maxCount: 1
        }
    ]), uploadStory
)
router.route("/get").get(getStory)
router.route("/").get(userStory)

export default router;