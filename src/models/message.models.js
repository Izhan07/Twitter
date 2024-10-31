import mongoose,{Schema} from "mongoose";

const messagechema = new Schema({
    content:{
        type: String,
        required: true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reciver:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

export const Message = mongoose.model("Message", messagechema)
