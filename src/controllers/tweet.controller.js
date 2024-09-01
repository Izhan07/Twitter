import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Tweet } from "../models/tweet.models.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.models.js";

const createTweet = asyncHandler(async(req, res)=>{
    const {content} = req.body
    if(content?.trim() === ""){
        throw new ApiError(404, "Content is required")
    }

    if(!isValidObjectId(req.user._id)){
        throw new ApiError(400, "Invalid Id")
    }
    let tweetImageLocalPath = req.files?.tweetImage?.[0]?.path || "";
    const tweetImage = tweetImageLocalPath? await uploadOnCloudinary(tweetImageLocalPath) : "";
    const tweet = await Tweet.create({
        content,
        owner: req.user?._id,
        tweetImage: tweetImage?.url || "",
        avatar: req.user.avatar,
        username: req.user.username
    })
    const postedTweet = await Tweet.findById(tweet._id)
    if(!postedTweet){
        throw new ApiError(500, "Something went wrong while Posting tweet")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200, postedTweet, "Tweet Posted successfully")
    )
})

const getUserTweets = asyncHandler(async(req, res)=>{
    const {userId} = req.params
    if(!isValidObjectId(userId)){
        throw new ApiError(400, "Invalid UserId")
    }
    const tweets = await Tweet.aggregate([
        {
            $match:{
                owner: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup:{
                from: "likes",
                localField: "_id",
                foreignField: "tweet",
                as: "like"
            }
        },
        {
            $addFields:{
                likeCheck:{
                    $cond:{
                        if:{$in:[req.user?._id, "$like.likedBy"]},
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project:{
                content: 1,
                owner: 1,
                tweetImage: 1,
                avatar: 1,
                username: 1,
                likeCheck: 1,
               
            }
        }
    ])
    if(!tweets?.length){
        throw new ApiError(400, "No Tweets Found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(
            200, tweets, "User Tweets fetched successfully"
        )
    )
})
const updateTweet = asyncHandler(async(req, res)=>{
    const {tweetId} = req.params
    if(!isValidObjectId(tweetId)){
        throw new ApiError(400, "Invalid Tweet Id")
    }
    const {content} = req.body
    if(content?.trim() === ""){
        throw new ApiError(400, "Content is required")
    }
   
    let tweetImageLocalPath = req.files?.tweetImage?.[0]?.path || ""
    const tweetImage =  tweetImageLocalPath? await uploadOnCloudinary(tweetImageLocalPath) : ""
    const updatedTweet = await Tweet.findByIdAndUpdate(
        tweetId,
        {
            $set:{
                content,
                tweetImage: tweetImage?.url || ""
            }
        },
        {
            new: true
        }
    )
     return res
     .status(200)
     .json(
        new ApiResponse(200, updatedTweet, "Tweet updated successfully")
     )
})
const deleteTweet = asyncHandler(async(req, res)=>{
    const {tweetId} = req.params
    if(!isValidObjectId(tweetId)){
        throw new ApiError(400, "Invalid TweetId")
    }
    const delTweet = await Tweet.findByIdAndDelete(
        tweetId
    )

    return res
    .status(200)
    .json(
        new ApiResponse(200, delTweet, "tweet deleted successfully")
    )
})



const getAllTweets = asyncHandler(async(req, res)=>{
    const {limit= 10, lastTweetId } = req.query
    const queryObject= {}

    if(lastTweetId){
        queryObject._id = {$lt: lastTweetId}
    }

    const tweets = await Tweet.find(queryObject)
    .sort({createdAt: -1})
    .limit(parseInt(limit))
    .lean();

    const usrLikes = await Like.find({
        likedBy: req.user?._id,
        tweet:{$in: tweets.map(tweet => tweet._id) }
    }).select("tweet").lean()

    const likedTweetIds = new Set(usrLikes.map(like => like.tweet.toString()))

    const tweetsWithLikedStatus = tweets.map(tweet => ({
        ...tweet,
        liked: likedTweetIds.has(tweet._id.toString())
    })
    )

    return res
    .status(200)
    .json({
        success: true,
        data: tweetsWithLikedStatus,
        lastTweetId: tweets.length > 0 ? tweets[tweets.length - 1]._id : null

    })
})

const getFollowingTweets = asyncHandler(async(req, res)=>{
    const followeds = req.followeds
   
    const tweets = await Tweet.aggregate([
        {
            $match:{
                owner: {$in: followeds}
            }
        },
        {
            $addFields: {
              randomSorter: { $rand: {} },
            },
          },
          {
            $sort: {
              randomSorter: 1,
            },
          },
        {
            $lookup:{
                from: "likes",
                localField: "_id",
                foreignField: "tweet",
                as: "like"
            }
        },
        {
            $addFields:{
                likeCheck:{
                    $cond:{
                        if: {$in: [req.user?._id, "$like.likedBy"]},
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project:{
                content: 1,
                tweetImage: 1,
                avatar: 1,
                username: 1,
                likeCheck: 1
            }
        }
    ])
    if(!tweets?.length){
        throw new ApiError(500, "No tweets Found")
    }
    return res 
    .status(200)
    .json(
        new ApiResponse(200, tweets, "tweets fetched successfully")
    )
})




export{
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet,
    getAllTweets,
    getFollowingTweets

}
