import connectDB from "./db/index.js";
import dotenv from "dotenv"
import { app } from "./app.js";

dotenv.config({
    path: './env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`MogoDB connected and app is listening at Port ${process.env.PORT} `)
    } )
})
.catch((error) => {
    console.log("MongoDb Connection Failed !!!", error)
})