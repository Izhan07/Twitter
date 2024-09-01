import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionTnstance = await mongoose.connect(`${process.env.MONGOBD_URI}/${DB_NAME}`)
        console.log(`\n Mongoose connected !! DB Host ${connectionTnstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection Error", error);
        process.exit(1)
    }
};
export default connectDB;

