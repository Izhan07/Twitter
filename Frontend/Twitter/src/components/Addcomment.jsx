import React from "react";
import {useForm} from "react-hook-form"
import Input from "./Input.jsx"

function PostComment({tweet, onCommentAdded}){

    const {handleSubmit, register, reset} = useForm()

    const postComment = async(data)=>{
       try {
        const token = localStorage.getItem("accessToken")
        if(!token ){
            console.error("No Token found in local Storage")
            return;
        }
         const response = await fetch(`http://localhost:8000/api/v1/comments/${tweet._id}`, {
             method: "POST",
             headers:{
                Authorization: `Bearer${token}`,
                 "Content-Type": "application/json"
             },
             body: JSON.stringify(data)
         })
         if(response.ok){
             const comment = await response.json()
             console.log(comment)
         }else{
             console.error("comment posting failed", response.message )
         }
       } catch (error) {
        console.error("Comment error", error)
       }
    }

    return(
        <>
        <form onSubmit={handleSubmit(postComment)} >
            <Input
            placeholder = "add a comment"
            type = "text"
            {...register("content", {
                required:true
            })}
            />
            <button type="submit">Post</button>
        </form>
        </>
    )
}
export default PostComment;