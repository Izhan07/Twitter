import React from "react";
import CommentLike from "./CommentLike.jsx";

function CommentContainer({comment}){
   
return(
    <>
    <div className="flex items-start w-full  my-2 bg-[#494949] rounded-2xl gap-3 p-2">
        <div className="w-6 h-6  rounded-full flex items-center justify-center">
             <img className="h-6 w-6 rounded-full object-cover  " src={comment.avatar}/>
            
        </div>
        <div className="flex items-start w-full gap-3  max-[536px]:flex-col">
        <div className="font-semibold">{comment.username}</div>
            <div className="w-[90%]" >{comment.content}</div>
        </div>
        <div>
            <CommentLike comment={comment}/>
        </div>
    </div>
    </>
)
}
export default CommentContainer;