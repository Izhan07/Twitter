import mongoose, {isValidObjectId} from "mongoose";
import { User } from "../models/user.models.js";
import { Subscription } from "../models/subscription.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const toggleSubscribe = asyncHandler(async(req, res)=>{
    const {accountName} = req.params
    if(!accountName?.trim()){
        throw new ApiError(400, "Invalid request")
    }
   
    const accountUser = await User.findOne({
        username: accountName
    }   
    )
    
    if(!accountUser){
        throw new ApiError(400, "account does not exist")
    }
    if(!req.user?._id){
        throw new ApiError(400, "user is not loggenIn")
    } 
    if (!isValidObjectId(req.user._id) || !isValidObjectId(accountUser._id)) {
        throw new ApiError(400, "Invalid ObjectId format");
    }
    const subscribed = await Subscription.create({
        subscriber: req.user._id,
        account: accountUser._id
    })
    return res
    .status(200)
    .json(
        new ApiResponse(200, subscribed, "Account subscribed successfully")
    )
})

const getUserSubscriber = asyncHandler(async(req, res)=>{
    const subscribers = req.subscribers
  
   const subscriber = await User.aggregate([
    {
        $match:{
           _id: {$in: subscribers}
        }
    },
    {
        $project:{
            username: 1,
            avatar: 1,
            _id: 1
        }
    }
   ])
   if(!subscriber?.length){
    throw new ApiError(400, "No subscriber found")
   }
   return res
   .status(200)
   .json(
    new ApiResponse(200, subscriber, "Subscriber fetched Successfully")
   )


})

const getUserFollowings = asyncHandler(async(req, res)=>{
    const followeds = req.followeds
    const followed = await User.aggregate([
        {
            $match:{
                _id: {$in: followeds}
            }
        },
        {
            $project:{
                username: 1,
                avatar: 1,
                _id: 1
            }
        }
    ])
    if(!followed.length){
        throw new ApiError(404, "This Account has No Followings")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, follower, "Followings fetched Successfully" )
    )
})


export{
    toggleSubscribe,
    getUserSubscriber,
    getUserFollowings
}