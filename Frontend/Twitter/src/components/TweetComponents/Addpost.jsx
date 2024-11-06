import React from "react";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Addpost(){
    const {handleSubmit, register} = useForm() 
    const navigate = useNavigate()

    const addpost = async(data)=>{
      try {
        const token = localStorage.getItem("accessToken")
        if(!token){
            console.error("No token found in localStorage")
            return;
        }
        const formData = new FormData()
        formData.append("content", data.content)
        if(data.tweetImage.length > 0){
            formData.append("tweetImage", data.tweetImage[0])
        }

          const response = await fetch(`https://twitter-kbki.onrender.com/api/v1/tweets/`,{
              method: "POST",
              headers:{
                Authorization: `Bearer${token}`,
                 
              },
              body: formData,
          })
          if(response.ok){
              const tweet = await response.json()
              navigate("/")
          }else{
              console.error("Tweet posting Failed", response.message)
          }
      } catch (error) {
        console.error("Add tweet error", error)
      }
    }
      

    return(
        <>
        <div className="h-dvh w-full  flex items-center justify-center bg-[#494949] p-2">
        <form className="w-96  h-96 px-2 py-2 rounded-xl bg-[#201f1f] text-[#E0E0E0] shadow-slate-950 shadow-2xl flex flex-col gap-6 " onSubmit={handleSubmit(addpost)} >
            <div className="w-full py-2 text-center">
                <h1 className="font-bold text-lg">
                    Create Tweet
                </h1>
            </div>
          <div className="w-full  py-1 px-2 flex flex-col rounded-md">
            <label className="font-semibold">
                Tweet:
            </label>
          <textarea
              className=" w-full h-10  my-2 bg-[#494949] py-1 px-1 border-2 border-[#33CBFE] scrollbar-hide resize-none rounded-md outline-none overflow-y-auto"
              placeholder="Enter Text"
              {...register("content", {
              required: true
            })}
/>

          </div>
          <div className="w-full  py-1 px-2 flex items-center justify-between rounded-md max-[352px]:flex-col max-[352px]:gap-3">
          <Input
          labelClass = "font-semibold"
            className="file:bg-[#33CBFE]  file:px-3 file:py-3 file:border-none file:rounded-full file:text-white file:cursor-pointer fil:shadow-lg file:shadow-blue-600/50   text-white/80 rounded-full w-52 py-2 px-2 border-2 border-[#33CBFE]   "
            label = "TweetImage"
            placeholder = "upload Image"
            type = "file"
            accept = "image/png, image/jpg, image/jpeg"
            {...register("tweetImage",{
                required: false
            })}
            />
          </div>
          <div className="w-full  py-1 px-2 flex flex-col rounded-md">
          <button className="bg-[#33CBFE] rounded-md text-white" type="submit" >Post</button>
          </div>
        </form>
        </div>
        </>
    )
}
export default Addpost;