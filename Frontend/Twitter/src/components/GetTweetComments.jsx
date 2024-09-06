import React, { useEffect, useState } from "react";
import CommentContainer from "./CommentContainer.jsx";
import PostComment from "./Addcomment.jsx";


function GetTweetComments({tweet}){
    const [Comments, setComments ] = useState([])
    
    const commentTweets = async()=>{
        try {
            const token = localStorage.getItem("accessToken")
            if(!token){
                console.error("No token found in localStorage")
            }
            const response = await fetch(`http://localhost:8000/api/v1/comments/${tweet._id}`,{
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
    const handleNewComment = (newComment) => {
        setComments((prevComments) => [...prevComments, newComment]); 
      };
    const renderComment = ()=>{
        return Comments.length > 0 ?Comments.map((comment, index)=> <div key={index}>
            <CommentContainer comment={comment}/>

        </div>) : (<p>no comm</p>)
    }
    return(
        <>
           {renderComment()}
         <PostComment tweet={tweet} onCommentAdded={handleNewComment}/>
        </>
    )
}
export default GetTweetComments;