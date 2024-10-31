import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import ProfileCont from "./UserProfileCont";
import GetUserSubscribers from "./GetUserSubscriber";


function GetUserProfile({user}){
    const [profile, setProfile] = useState()
    const Userprofile = async()=>{
        try {
            const token = localStorage.getItem("accessToken")
            if(!token){
                console.error("No token found in localstorage")
                return;
            }
            const response = await fetch(`http://localhost:8000/api/v1/users/c/${user}`,{
                method:"GET",
                headers:{
                    Authorization: `Bearer${token}`,
                    "Content-Type": "application/json"
                }
            })
            if(response.ok){
                const profile = await response.json()
                setProfile(profile)

            }else{
                console.error("No user profile found", response.statusText)
            }
        } catch (error) {
            console.error("Something went wrong while fetching User profile", error)
        }
    }
    useEffect(()=>{
        Userprofile()
    },[])
    return(
        <>
           {
            profile? <div>
                <ProfileCont profile={profile}/> 
                
            </div> : <div className="w-full h-full flex items-center justify-center  bg-[#201f1f]">
                <div className="w-32 h-32 border-t-4 border-[#494949] border-solid rounded-full animate-spin "></div>
            </div>
           }
        </>
    )
}
export default GetUserProfile;