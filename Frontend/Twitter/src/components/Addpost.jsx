import React from "react";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Addpost(){
    const {handleSubmit, register} = useForm() 
    const navigate = useNavigate()
    const userData = useSelector((state)=> state.auth.userData)

    const addpost = async(data)=>{
      try {
          const response = fetch(`http://localhost:8000/api/v1/tweets/`,{
              method: "POST",
              headers:{
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
          })
          if(response.ok){
              const tweet = await response.json()
              console.log(tweet)
          }else{
              console.error("Tweet posting Failed", response.message)
          }
      } catch (error) {
        console.error("Add tweet error", error)
      }
    }
      

    return(
        <>
        <form onSubmit={handleSubmit(addpost)} >
            <Input
            label = "Tweet"
            type = "text"
            placeholder = "Enter Text"
            {...register("content",{
                required: true
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
            <button type="submit" >Post</button>
        </form>
        </>
    )
}
export default Addpost;