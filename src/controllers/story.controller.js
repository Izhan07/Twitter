import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Story } from "../models/story.models.js";
import {User} from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {v2 as Cloudinary} from "cloudinary"
import mongoose, { isValidObjectId, Types } from "mongoose";

const uploadStory = asyncHandler(async (req, res) => {
    const storyLocalPath = req.files?.story?.[0]?.path;
    
    if (!storyLocalPath) {
        throw new ApiError(404, "Story is required");
    }

    const cloudinarystory = await uploadOnCloudinary(storyLocalPath);

    if (!cloudinarystory || !cloudinarystory.url) {
        throw new ApiError(500, "Something went wrong while uploading story");
    }

    const story = await Story.create({
        story: cloudinarystory.url,
        owner: req.user?._id
    });

    return res
        .status(200)
        .json(new ApiResponse(200, story, "Story uploaded successfully"));
});
const getStory = asyncHandler(async(req, res)=>{
   if(!isValidObjectId(req.user?._id)){
    throw new ApiError(400, "Invalid userId")
   }
   const story = await Story.aggregate([
    {
        $match:{
            owner: {$ne:req.user._id}
        }
    },
    {
        $lookup:{
            from: "users",
            localField: "owner",
            foreignField: "_id",
            as: "userDetails"
        }
    },
    {
        $unwind: "$userDetails"
    },
    {
        $project:{
            story: 1,
            "userDetails.username": 1,
            "userDetails.avatar": 1
        }
    }
   ])
   return res
   .status(200)
   .json(
    new ApiResponse(200, story, "Stories fetched successfully")
   )
})
const userStory = asyncHandler(async(req, res)=>{
    if(!isValidObjectId(req.user._id)){
        throw new ApiError(400, "Invalid userId")
    }
    const user = await User.findById(
        req.user?._id
    ).select("-password -refreshToken")
    const story = await Story.aggregate([
        {
            $match:{
                owner: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup:{
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "userDetails"
            }
        },
        {
            $unwind: "$userDetails"
        },
        {
            $project:{
                story: 1,
                "userDetails.username":1,
                "userDetails.avatar": 1
            }
        }
    ])
    if(!story.length){
        return res
        .status(200)
        .json(
            new ApiResponse(200, user, "User fetched successfully")
        )
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200, story, "user Story fetched successfully")
    )
})

export {
    uploadStory,
    getStory,
    userStory
};
