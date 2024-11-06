import { Message } from "../models/message.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose,{isValidObjectId} from "mongoose";

const sendMessage = asyncHandler(async(req, res)=>{
    const {reciverId} = req.params
    if(!isValidObjectId(reciverId)){
        throw new ApiError(400, "Invalid ReciverId")
    }
    const {content} = req.body
    if(content?.trim()=== ""){
        throw new ApiError(404, "Message content is required")
    }
    const message = await Message.create({
        content,
        owner: req.user?._id,
        reciver: reciverId
    })
    const sendedMessage = await Message.findById(message._id)
   
    if(!sendedMessage){
        throw new ApiError(500, "Something went wrong while sending message")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200, sendedMessage, "Message send successfully")
    )
})
const getMessages = asyncHandler(async(req, res)=>{
    const {userId} = req.params
    if(!isValidObjectId(userId)){
        throw new ApiError(400, "Invalid userId")
    }
    const messages = await Message.aggregate([
        {
            $match:{
                $or: [
                    {
                        owner: new mongoose.Types.ObjectId(req.user?._id),
                        reciver: new mongoose.Types.ObjectId(userId)
                    },
                    {
                        owner: new mongoose.Types.ObjectId(userId),
                        reciver: new mongoose.Types.ObjectId(req.user?._id)
                    }
                ]
            }
        },
        {
            $project:{
                content: 1,
                owner: 1,
                reciver: 1
            }
        }
      
    ])
    return res
    .status(200)
    .json(
        new ApiResponse(200, messages, "Messages fetched successfully")
    )
})
const getMessagedTo = asyncHandler(async(req, res)=>{

    const profiles = await Message.aggregate([
        {
            $match:{
                $or:[
                    {
                        owner: new mongoose.Types.ObjectId(req.user?._id)
                    },
                    {
                        reciver: new mongoose.Types.ObjectId(req.user?._id)
                    }
                   ]
            }
        },
        {
            $group: {
                _id: {
                    $cond: {
                        if: { $ne: ["$owner", req.user?._id] },
                        then: "$owner",
                        else: "$reciver"
                    }
                }
            }
        },
        {
            $lookup:{
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "profile"
            }
        },
        {
            $unwind: "$profile"
        },
        {
            $project:{
               "profile.username": 1,
               "profile.avatar": 1,
               "profile._id": 1
            }
        }
    ])
    return res
    .status(200)
    .json(
        new ApiResponse(200, profiles, " Messaged Profiles found successfully")
    )
})
export{
    sendMessage,
    getMessages,
    getMessagedTo
}