import React from "react";
import Input from "../Input.jsx"
import {useForm} from "react-hook-form"
import { useNavigate } from "react-router-dom";

function UpdateTweet({tweet}){
    const {handleSubmit, register} = useForm()
    const navigate = useNavigate()
     
    const tweetUpdate = async(data)=>{
        try {
            const token = localStorage.getItem("accessToken")
            if(!token){
                console.error("No token found in localStorage")
                return;
            }
           
            const formData = new FormData()
          if(data.content){
            formData.append("content", data.content)
          }else{
            formData.append("content", tweet.content)
          }
          if (data.tweetImage?.[0]) {
            formData.append("tweetImage", data.tweetImage[0]);
        } else{
            formData.append("tweetImage", tweet.tweetImage);
        }
            const response = await fetch(`https://twitter-kbki.onrender.com/api/v1/tweets/${tweet._id}`,{
                method: "PATCH",
                headers:{
                    Authorization: `Bearer${token}`,
                   
                },
                body: formData
            })
            if(response.ok){
                const updatedTweet = await response.json()
                 navigate("/")
            }else{
                console.error("Tweet updation failed", response.statusText)
            }
            
          } catch (error) {
            console.error("something went wrong while updating tweet")
          }
    }
  

    return(
        <>
        <form className=" h-[90%] flex flex-col w-full px-2" onSubmit={handleSubmit(tweetUpdate)}>
           <div className="w-full my-5">
           <Input
            className="flex flex-col w-full my-2 px-2 py-2 rounded-lg bg-[#494949]"
            type = "text"
            placeholder = "Enter your Tweet"
            label = "Tweet:"
            {...register("content",{
                required: false,
            })}
            />
           </div>
           <div className="flex flex-col   justify-between h-full pt-4 w-full mt-6 py-2 ">
           <div className="w-full  flex max-[536px]:flex-col max-[536px]:gap-3  items-center justify-between ">
           <Input
           className="file:bg-gradient-to-b file:from-blue-500 file:to-blue-600 file:px-6 file:py-3 file:m-5 file:border-none file:rounded-full file:text-white file:cursor-pointer fil:shadow-lg file:shadow-blue-600/50 bg-gradient-to-br from-gray-600 to-gray-700  text-white/80 rounded-full max-[536px]:w-full "
           labelClass="font-semibold "
            label = "TweetImage"
            placeholder = "upload Image"
            type = "file"
            accept = "image/png, image/jpg, image/jpeg"
            {...register("tweetImage",{
                required: false
            })}
            />
           </div>
           <div className="w-full flex items-center justify-center">
          <button className="bg-[#33CBFE] text-white px-3 py-2 w-44 rounded-2xl" type="submit">Submit</button>
        </div>
        </div>   
        </form>
        </>
    )
}
export default UpdateTweet;