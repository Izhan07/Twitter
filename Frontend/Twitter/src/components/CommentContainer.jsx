import React from "react";
import CommentLike from "./CommentLike.jsx";

function CommentContainer({comment}){

return(
    <>
    <div>
        <div>
             <img src={comment.avatar}/>
        </div>
        <div>
            <div>{comment.username}</div>
            <div>{comment.content}</div>
        </div>
        <div>
            <CommentLike comment={comment}/>
        </div>
    </div>
    </>
)
}
export default CommentContainer;