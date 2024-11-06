import React, { useEffect, useState } from "react";
import CommentContainer from "./CommentContainer.jsx";
import { io } from "socket.io-client";
let socket;


function GetTweetComments({tweet}){
    const [Comments, setComments ] = useState([])
    const userId = localStorage.getItem("userId");

    useEffect(()=>{
        socket = io("https://twitter-kbki.onrender.com",{
            withCredentials: true
        });

        socket.emit('joinRoom', {userId, tweetId: tweet._id})

        socket.on('receiveComment',(comment)=>{
            console.log(comment)
            setComments((prevComments)=> [...prevComments, comment])
        });

        return()=>{
            socket.disconnect();
        }
    },[userId])
    
    const commentTweets = async()=>{
        try {
            const token = localStorage.getItem("accessToken")
            if(!token){
                console.error("No token found in localStorage")
            }
            const response = await fetch(`https://twitter-kbki.onrender.com/api/v1/comments/${tweet._id}`,{
                method: "GET",
                headers:{
                    Authorization: `Bearer${token}`,
                    "Content-Type": "application/json"
                }
            })
            if(response.ok){
                const comment = await response.json()
                
                setComments(comment.data)
            }else{
                console.error("Erroe ffetching Comments", response.message)
            }
        } catch (error) {
            console.error("comment error", error)
        }
    } 
    useEffect(()=>{
        commentTweets()
    },[])
    
    const renderComment = ()=>{
        return Comments.length > 0 ?Comments.map((comment, index)=> <div key={index}>
            <CommentContainer comment={comment}/>

        </div>) : (<p></p>)
    }
    return(
        <>
           {renderComment()}
        
        
    
        </>
    )
}
export default GetTweetComments;