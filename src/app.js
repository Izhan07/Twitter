import express, { urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express()

 
app.use(cors({
    origin: "https://twitter-kbki.onrender.com",
    credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// import router

import userRouter from './routes/user.router.js';
import subsRouter from './routes/subscription.router.js'
import tweetRouter from './routes/tweet.router.js'
import commentRouter from './routes/comment.router.js'
import likeRouter from './routes/like.router.js'
import storyRouter from "./routes/story.router.js"
import messageRouter from "./routes/message.router.js"

app.use("/api/v1/users", userRouter)
app.use("/api/v1/subs", subsRouter )
app.use("/api/v1/tweets", tweetRouter )
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/likes", likeRouter)
app.use("/api/v1/story", storyRouter)
app.use("/api/v1/message",messageRouter)



export { app }
