import React from "react";
import Input from "../Input.jsx"
import {useForm} from "react-hook-form"

function UpdateTweet({tweet}){
    const {handleSubmit, register} = useForm()
     
    const tweetUpdate = async(data)=>{
        try {
            const token = localStorage.getItem("accessToken")
            if(!token){
                console.error("No token found in localStorage")
                return;
            }
            console.log(tweet.tweetImage)
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
            const response = await fetch(`http://localhost:8000/api/v1/tweets/${tweet._id}`,{
                method: "PATCH",
                headers:{
                    Authorization: `Bearer${token}`,
                   
                },
                body: formData
            })
            if(response.ok){
                const updatedTweet = await response.json()
                 console.log(updatedTweet)
            }else{
                console.error("Tweet updation failed", response.statusText)
            }
            
          } catch (error) {
            console.error("something went wrong while updating tweet")
          }
    }
  

    return(
        <>
        <form onSubmit={handleSubmit(tweetUpdate)}>
            <Input
            type = "text"
            placeholder = "Enter your Tweet"
            label = "Tweet"
            {...register("content",{
                required: false,
            })}
            />
              <Input
            label = "TweetImage"
            placeholder = "upload Image"
            type = "file"
            accept = "image/png, image/jpg, image/jpeg"
            {...register("tweetImage",{
                required: false
            })}
            />
            <button type="submit">Update</button>
              
        </form>
        </>
    )
}
export default UpdateTweet;