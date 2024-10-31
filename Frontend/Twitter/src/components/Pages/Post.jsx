import React from "react"
import {useLocation} from "react-router-dom"
import {TweetContainer} from "../index.js"
function Post(){
const location = useLocation()
const post = location.state
const tweet = post.tweet
    return(
        <>
        <div className="flex items-center justify-center w-full  bg-[#494949] p-2 overflow-y-auto  min-[380px]:h-dvh pb-16  md:pb-14 min-height[880px]:h-dvh min-h-[100vh]">
      
      <div className="shadow-slate-950 shadow-2xl   flex items-center justify-center    ">
       <TweetContainer tweet={tweet}/>
       </div>
     
        </div>
        </>
    )
}
export default Post;