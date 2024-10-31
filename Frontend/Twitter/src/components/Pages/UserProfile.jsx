import React,{useEffect} from "react";
import {GetUserProfile, GetUsertweets } from "../index.js"
import Followers from "./Followers.jsx";
import Following from "./Following.jsx";
import { useLocation } from "react-router-dom";
function UserProfile(){
     const location = useLocation()
     const user = location.state
     const UserName = user.user.username
     const id = user.user._id
     const N = location.state
     const Name = N.user.username
     const Id = N.user._id
    return(
        <>
        <div className="h-dvh w-full flex flex-col overflow-y-auto  bg-[#201f1f] text-[#E0E0E0] ">
       <div className="h-full w-full">
       <GetUserProfile user={UserName || Name}/>
       </div>
       <div className=" w-full flex flex-col gap-3 p-2 items-center border-t-2 border-[#494949] pb-20 ">
       <GetUsertweets user={id || Id}/>
       </div>
        </div>
        </>
    )
}
export default UserProfile;