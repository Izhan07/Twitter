import mongoose, {Schema} from "mongoose";

const commentSchema = new Schema({
    content:{
        type: String,
        required: true
    },
    tweet:{
        type: Schema.Types.ObjectId,
        ref: "Tweet"
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
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

export const Comment = mongoose.model("Comment", commentSchema)
