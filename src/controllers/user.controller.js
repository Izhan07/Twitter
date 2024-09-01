import { ApiError } from "../utils/ApiErrors.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"

const resgiterUser = asyncHandler( async ( req, res )=>{
    const { fullname, username, password, email } = req.body
    if(
        [fullname, email, username, password].some((field)=>
        field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All Fields are required")
    }

   const existedUser = await User.findOne({
        $or:[{email}, {username}]
    }) 

    if(existedUser){
        throw new ApiError(409, "User with email or Username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    let coverImageLoaclPath = req.files?.coverimage?.[0]?.path || "";

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }
    
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverimage = coverImageLoaclPath ? await uploadOnCloudinary(coverImageLoaclPath) : "";

    if(!avatar){
        throw new ApiError(500, "Something went wrong while uploading avatar")
    }
    const user =  await User.create({
        email,
        password,
        username: username.toLowerCase(),
        avatar: avatar.url,
        coverimage: coverimage?.url || "",
        fullname,

        

    })
   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
   )
   
   if(!createdUser){
    throw new ApiError(500, "Something went wrong while registring User")
   }

   return res.status(201).json(
    new ApiResponse(201, createdUser, "User registered Successfully")
   )

    
}) 

const generateAccessTokenAndRefreshToken = async (userId) => {
     try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
       await user.save({validateBeforeSave: false})
        return {refreshToken, accessToken}
        
     } catch (error) {
        throw new ApiError(500, "something went wrong while generating access and refresh tokens")
     }
}

const loginUser = asyncHandler( async ( req, res ) =>{
    const { email, username, password } = req.body

if(!username && !email){
    throw new ApiError(400, "Username and Email is required")
}

const user = await User.findOne({
    $or: [{username}, {email}]
})

if(!user){
    throw new ApiError(404, "User does not exist")
}

const isPasswordValid = await user.isPasswordCorrect(password)

if(!isPasswordValid){
    throw new ApiError(401, "invalid user credentials")
}

const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken( user._id )

const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
const options = {
    httpOnly: true,
    secure: true
}

return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(
    new ApiResponse(200, 
        {
            user: loggedInUser, refreshToken, accessToken
        },
        "User LoggedIn Successfully"
        
    )
)

})

const loggedOutUser = asyncHandler( async(req, res) =>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
          $set: {
            refreshToken: undefined
          }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.
    status(200).
    clearCookie("accessToken", options).
    clearCookie("refreshToken", options).
    json(
        new ApiResponse(200, {}, "User Logged Out Successfully")
    )
    
    

} )
const refreshAccessToken = asyncHandler(async(req, res) =>{
    const token = req.cookies?.refreshToken || req.body.refreshToken
    if(!token){
        throw new ApiError(401, "Unauthorized request")
    }
    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    const user = await User.findById(decodedToken?._id)
    if(!user){
        throw new ApiError(401, "Invalid Refresh Token")
    }
    if(token !== user?.refreshToken){
        throw new ApiError(401, "Refresh Token is expired or used")
    }

   const {accessToken, newRefreshToken} = await generateAccessTokenAndRefreshToken(user-_id)

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.
    status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
               refreshToken: newRefreshToken, accessToken
            },
            "Access Token refreshed"
        )
    )
  
})

const changeCurrentPassword = asyncHandler(async(req, res) =>{
    const {oldPassword, newPassword} = req.body
    const user = await User.findById(req.user._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid Old Password")
    }
    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))

})

const getCurrentUser = asyncHandler(async(req, res)=>{
    return res
    .status(200)
    .json(
        new ApiResponse(200, req.user, "current user fetched successfully" )
    )
})

const updateAccountDetails = asyncHandler(async(req, res)=>{
    const {fullname, email} = req.body
    if(!fullname || !email){
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
           $set: {email, fullname}
        },
        {
            new: true
        }
    ).select("-password")
    
    return res
    .status(200)
    .json(new ApiResponse(
        200, user, "Account Details updated Successfully"
    ))
    
})

const updateUserAvatar = asyncHandler(async(req, res)=>{
    const avatarLocalPath = req.file?.path
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is missing")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if(!avatar.url){
        throw new ApiError(500, "Something went wrong while uploading an avatar")
    }
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{avatar: avatar.url}
        },
        {
            new: true
        }.select("-password")
    )
    return res
    .status(200)
    .json(new ApiResponse(
        200, user, "Avatar Update Successfully"
    ))
})

const updateCoverImage = asyncHandler(async(req, res)=>{
    const coverImageLocalPath = req.file?.path
    if(!coverImageLocalPath){
        throw new ApiError(400, "CoverImage is missing")
    }
    const coverimage = await uploadOnCloudinary(coverImageLocalPath)
    if(!coverimage.url){
        throw new ApiError(500, "Something went wrong while uploading an coveriamge")
    }
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{coverimage: coverimage.url}
        },
        {
            new: true
        }.select("-password")
    )
    return res
    .status(200)
    .json(new ApiResponse(
        200, user, "coverimage Updated Successfully"
    ))
})

const getUserCurrentProfile = asyncHandler(async(req, res)=>{
    const {username} = req.params
    if(!username?.trim()){
        throw new ApiError(400, "username is missing")
    }
    const channel = await User.aggregate([
        {
            $match: {
                username: username?.toLowerCase()
            }
        },
        {
            $lookup:{
                from: "subscriptions",
                localField: "_id",
                foreignField: "account",
                as: "subscribers"
            }
        },
        {
            $lookup:{
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo"
            }
        },
        {
            $addFields: {
                subscriberCount: {
                    $size: "$subscribers"
                },
                channelSubsribedToCount: {
                    $size: "$subscribedTo"
                },
                isSubscribed: {
                   $cond:{
                    if: {$in: [req.user?._id, "$subscribers.subscriber"]},
                    then: true,
                    else: false
                   }
                }
            }

        },
        {
            $project: {
                fullname: 1,
                username: 1,
                avatar: 1,
                coverimage: 1,
                subscriberCount: 1,
                channelSubsribedToCount: 1,
                isSubscribed: 1,
                email: 1
            }
        }
    ])
    if(!channel?.length){
        throw new ApiError(400, "channel does not exist")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200, channel[0], "Channel fetched successfully")
    )
})




export {
    resgiterUser,
    loginUser,
    loggedOutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateCoverImage,
    getUserCurrentProfile,

}