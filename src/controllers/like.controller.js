import { Like } from "../models/like.models.js";
import mongoose, {isValidObjectId} from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const toggleTweetLike = asyncHandler(async(req, res)=>{
    const {tweetId} = req.params
    if(!isValidObjectId(tweetId)){
        throw new ApiError(400, "Invalid objed id")
    }
    const likecheck = await Like.findOne({
        tweet: tweetId,
        likedBy: req.user?._id
    })
    if(likecheck?._id){
        await Like.findByIdAndDelete(likecheck?._id)
        return res.status(200).json(new ApiResponse(200, {}, "kkkk"))
    }else{
        const like = await Like.create({
            tweet: tweetId,
            likedBy: req.user?._id
        })
        const likedTweet = await Like.findById(like._id)
        if(!likedTweet){
            throw new ApiError(500, "Something went wrong while Posting like")
        }
        return res
        .status(200)
        .json(
            new ApiResponse(200, likedTweet, "Tweet liked successfully")
        )
    }
  
  
})

    

const getLikedTweets = asyncHandler(async(req, res)=>{
    const user = req.user
    if(!isValidObjectId(user._id)){
        throw new ApiError(400, "Invalid User Id")
    }
    const likedTweets = await Like.aggregate([
       {
        $match:{
            likedBy: new mongoose.Types.ObjectId(user._id)
        }
       },
       {
        $lookup:{
            from: "tweets",
            localField: "tweet",
            foreignField: "_id",
            as: "liked"
        }
       },
       {
        $addFields:{
            likedCount:{
                $size: "$liked"
            }
        }
       },
       {
        $project:{
            liked: 1,
            likedCount: 1
        
        }
       }
    ])
    if(!likedTweets?.length){
        throw new ApiError(500, "No liked tweets found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, likedTweets, "liked tweet fetched successfully")
    )
})
const commentLike = asyncHandler(async(req,res)=>{
    const {commentId} = req.params
    if(!isValidObjectId(commentId)){
        throw new ApiError(400, "Invalid Comment Id")
    }
    const likeCheck = await Like.findOne({
        comment: commentId,
        likedBy: req.user?._id
    })
    if(likeCheck?._id){
        await Like.findByIdAndDelete(likeCheck?._id)
        return res.status(200).json(new ApiResponse(200,{}, "Comment Unlike Successfully"))
    }else{
        const like = await Like.create({
            comment: commentId,
            likedBy: req.user?._id
        })
        const likedComment = await Like.findById(like._id)
        if(!likedComment){
            throw new ApiError(500, "Something went wrong while posting like")
        }
        return res
        .status(200)
        .json(
            new ApiResponse(200, likedComment, "Comment liked successfully")
        )
    }
})

const tweetLikeCounts = asyncHandler(async(req, res)=>{
    const {tweetId} = req.params
    if(!isValidObjectId(tweetId)){
        throw new ApiError(400, "invalid TweetId")
    }
    const likes = await Like.aggregate([
        {
            $match:{
                tweet: new mongoose.Types.ObjectId(tweetId)
            }
        },
        {
            $lookup:{
                from: "likes",
                localField: "tweetId",
                foreignField: "tweet",
                as: "likesC"
            }
        },
        {
            $addFields:{
                likeCounts:{
                    $size: "$likesC"
                }
            }
        },
        {
            $project:{
                likeCounts: 1,
            }
        }

    ])
    if(!likes?.length){
        throw new ApiError(404, "No likes found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200, likes, "likes count su")
    )
})
export {
    toggleTweetLike,
    getLikedTweets,
    commentLike,
    tweetLikeCounts
}