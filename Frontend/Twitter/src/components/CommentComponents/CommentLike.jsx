import React, {useState} from "react";


function CommentLike({comment}){

     const [liked, setCommentLiked] = useState(comment.checkLikes)
     const likeComment = async()=>{
        try {
            const token = localStorage.getItem("accessToken")
            if(!token){
                console.error("No token found in localStorage")
                return;
            }
            const response = await fetch(`https://twitter-kbki.onrender.com/api/v1/likes/toggle/c/${comment._id}`,{
                method: "POST",
                headers:{
                    Authorization: `Bearer${token}`,
                    "Content-Type": "application/json"
                }
            })
            if(response.ok){
                setCommentLiked(!liked)
            }else{
                console.error("Post Comment like Error", response.message)
            }
        } catch (error) {
            console.error("comment like error", error)
        }
     }
    return(
        <>
        {
            liked? (
                <button onClick={likeComment} >❤️</button>
            ) : (
                <button onClick={likeComment} > 🤍</button>
            )
        }
        </>
    )
}
export default CommentLike;