import React from "react";
import {GetFollowingTweets, GetUserStory,GetStory} from "../index.js"

function Home(){
   
    return(
        <>
     <div className="h-dvh  w-full  overflow-y-scroll bg-[#201f1f] text-[#E0E0E0]  pb-20">
     <div className=" w-full flex justify-center items-center border-b-2 border-[#494949] ">
        <div className=" w-24 flex items-center justify-center py-1">
            <GetUserStory/>
        </div>
        <div className="w-full flex  gap-2  px-3 py-3  overflow-x-auto ">
       
            <GetStory/>
            
        </div>
     </div>
     <div className="w-full   flex flex-col items-center  p-2 gap-7 pt-4 ">
     <GetFollowingTweets/>
     </div>
     </div>
        </>
    )
}
export default Home;
