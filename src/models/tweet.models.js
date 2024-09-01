import mongoose, {Schema} from "mongoose";

const tweetSchema = new Schema({
    content:{
        type: String,
        required: true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    tweetImage:{
        type: String,
    },
    avatar:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    }

    
},{timestamps: true})

export const Tweet = mongoose.model("Tweet", tweetSchema)