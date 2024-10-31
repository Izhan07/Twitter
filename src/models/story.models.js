import mongoose, {Schema} from "mongoose";

const storySchema = new Schema({
    story:{
        type: String,
        required: true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
},{timestamps:true})

export const Story = mongoose.model("Story", storySchema)