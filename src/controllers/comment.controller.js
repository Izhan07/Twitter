import { Comment } from "../models/comment.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose, {isValidObjectId} from "mongoose";

const addComment = asyncHandler(async(req, res)=>{
    const {tweetId} = req.params
    if(!isValidObjectId(tweetId)){
        throw new ApiError(400, "Invalid Tweet Id")
    }
    const {content} = req.body
    if(content?.trim() === ""){
        throw new ApiError(400, "Content is required")
    }
    const comment = await Comment.create({
        content,
        owner: req.user?._id,
        tweet: tweetId,
        avatar: req.user?.avatar,
        username: req.user?.username
    })
    const postedComment = await Comment.findById(comment._id)
    if(!postedComment){
        throw new ApiError(500, "Something went wrong while posting comment")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200, postedComment, "Comment posted successfully")
    )
})

const getTweetComments = asyncHandler(async(req, res)=>{
    const {tweetId} = req.params
    if(!isValidObjectId(tweetId)){
        throw new ApiError(400, "Invalid TweetId")
    }
    const comments = await Comment.aggregate([
        {
            $match:{
                tweet: new mongoose.Types.ObjectId(tweetId)
            }
        },
        {
            $lookup:{
                from: "likes",
                localField: "_id",
                foreignField: "comment",
                as: "like"
            }
        },
        {
            $addFields:{
                checkLikes:{
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
                tweet: 1,
                owner: 1,
                avatar: 1,
                username: 1,
                checkLikes: 1
            }
        }
    ])
   
    return res
    .status(200)
    .json(
        new ApiResponse(200, comments, "Comments fetched successfully")
    )
})
const updateComment = asyncHandler(async(req, res)=>{
    const {commentId} = req.params
    if(!isValidObjectId(commentId)){
        throw new ApiError(400, "Invalid Comment Id")
    }
    const {content} = req.body
    if(content?.trim() === ""){
        throw new ApiError(404, "Content is required")
    }
    const comment = await Comment.findByIdAndUpdate(
        commentId,
        {
            $set:{
                content
            }
        },
        {
            new: true
        }
    )
    return res
    .status(200)
    .json(
        new ApiResponse(200, comment, "Comment updated successfully")
    )
})

const deleteComment = asyncHandler(async(req, res)=>{
    const {commentId} = req.params
    if(!isValidObjectId(commentId)){
        throw new ApiError(400, "Invalid Comment Id")
    }
    const comment = await Comment.findByIdAndDelete(
        commentId,
        {
            new: true
        }
    )
    return res
    .status(200)
    .json(
        new ApiResponse(200, comment, "Comment Deleted successfully")
    )
})

export {
    addComment,
    getTweetComments,
    updateComment,
    deleteComment
}