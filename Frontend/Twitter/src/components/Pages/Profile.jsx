import React,{useEffect, useState} from "react";
import {GetUserProfile, GetOwnerTweets} from "../index.js"
function Profile(){
   const user = localStorage.getItem("username")
    return(
        <>
      <div className="md:h-dvh h-[79%]  overflow-y-scroll  w-full ">
     <div>
     <GetUserProfile user={user}/>
     </div>
    <div className="h-full w-full    bg-[#201f1f] text-[#E0E0E0] border-t-2  border-[#494949]">
    <GetOwnerTweets/>
    </div>
      </div>
        </>
    )
}
export default Profile;