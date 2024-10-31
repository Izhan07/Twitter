import mongoose, {isValidObjectId} from "mongoose";
import { User } from "../models/user.models.js";
import { Subscription } from "../models/subscription.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const getUserChannelSubscribers = asyncHandler(async (req, res, next) => {
   
     const { accountId } = req.params;
 
     if (!isValidObjectId(accountId)) {
         throw new ApiError(400, "Invalid Account ID");
     } 
 
   
     const user = await User.findById(accountId);
 
     if (!user) {
         throw new ApiError(404, "Account Does Not Exist");
     }
 
     const subscribers = await Subscription.aggregate([
         {
             $match: {
                 account: new mongoose.Types.ObjectId(accountId)
             }
         },
         {
             $project: {
                 subscriber: 1,
                 _id: 0
             }
         }
     ]);
 
    
        
          const subscriberIds = [...new Set(subscribers.map((sub) => sub.subscriber))];
          
     
         req.subscribers = subscriberIds;
         next()
 
});

 const getSubscribedChannels = asyncHandler(async(req, res, next)=>{
    const {accountId} = req.params 
    if(!isValidObjectId(accountId)){
        throw new ApiError(400, "Invalid Account ID")
    }
    const subscribedTo = await Subscription.aggregate([
        {
            $match:{
                subscriber: new mongoose.Types.ObjectId(accountId)
            }
        },
        {
            $project:{
                account: 1,
                _id: 0
            }
        }
    ])
   
    const followedId = [...new Set(subscribedTo.map((sub)=> sub.account))]
    req.followeds = followedId
    next()
 })
export {
    getUserChannelSubscribers,
    getSubscribedChannels
}