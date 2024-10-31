import React,{useEffect, useState} from "react";
import {useForm} from "react-hook-form"
import Input from "../Input.jsx"
import Post from "../../img/share.png"
import { io } from "socket.io-client";

let socket;

function PostComment({tweet}){
    const [user, setUser] = useState()
    const {handleSubmit, register} = useForm()

    const getUser = async()=>{
        try {
          const token = localStorage.getItem("accessToken")
          if(!token){
            console.error("No token found")
          }
          const response = await fetch(`http://localhost:8000/api/v1/users/currentUser`,{
            method: "GET",
            headers:{
              Authorization: `Bearer${token}`,
              "Content-Type": "application/json"
            }
          })
          if(response.ok){
            const User = await response.json()
            setUser(User.data)
          }
        } catch (error) {
          console.error("Something went wrong while geting user",error)
        }
      }
      useEffect(()=>{
        getUser()
      },[])

    useEffect(()=>{
        socket = io("http://localhost:8000", {
            withCredentials: true,
        })

        return ()=>{
            if(socket){
                socket.disconnect();
            }
        }
    },[])

    const postComment = async(data)=>{
      if(socket){
        const ownerId = localStorage.getItem("userId");
        socket.emit('postComment',{
            content: data.content,
            ownerId,
            postId: tweet._id,
            avatar: user.avatar,
            username: user.username
        })
      } else{
        console.error("Socket not connected");
      }
    }

    return(
        <>
        <form className="w-[32rem]  max-[536px]:w-[18rem] rounded-b-2xl border-none flex items-center justify-center relative bg-[#494949] " onSubmit={handleSubmit(postComment)} >
            <Input
            placeholder = "add a comment"
            className="w-4/5 mx-2 p-2 outline-none overflow-y-auto rounded-2xl bg-[#494949]"
            type = "text"
            {...register("content", {
                required:true
            })}
            />
            <button className=" absolute bg-[#494949] border-none right-1" type="submit">
                <img className="h-6 w-6 object-cover" src={Post}/>
            </button>
        </form>
        </>
    )
}
export default PostComment;