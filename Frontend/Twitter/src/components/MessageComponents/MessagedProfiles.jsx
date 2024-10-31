import React,{useEffect, useState} from "react";
import { Link } from "react-router-dom";
import ProfileCont from "./ProfileCont";
import chat from "../../img/chatEmpty.png"
function MessagedProfiles(){
    const [User, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const profiles = async()=>{
        try {
            setLoading(true)
            const token = localStorage.getItem("accessToken")
            if(!token){
                console.error("No token found")
                return
            }
            const response = await fetch(`http://localhost:8000/api/v1/message/profile/users`,{
                method: "GET",
                headers:{
                    Authorization: `Bearer${token}`,
                    "Content-Type": "application/json"
                }
            })
            if(response.ok){
                const profile = await response.json()
                setUser(profile.data)
              
            }else{
                console.error("fetching profile failed", response.statusText)
            }
        } catch (error) {
            console.log("Something went wrong while fetching profile", error)
        } finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        profiles()
    },[])
    return(
        <>
        <div className="h-dvh w-full bg-[#201f1f] text-[#E0E0E0] overflow-y-auto flex flex-col px-2 py-1 ">
        {
            loading ? ( <div className="w-full h-full flex items-center justify-center  bg-[#201f1f]">
                <div className="w-32 h-32 border-t-4 border-[#494949] border-solid rounded-full animate-spin "></div>
            </div>) :
            User.length > 0 ? (
                User.map((user, index)=>
              <Link key={index} to="/chats" state={{user: user.profile}} >
                <div>
                    <ProfileCont user={user.profile}/>
                </div>
              </Link>
                )
            ) : (<div className="flex flex-col items-center justify-center w-full h-full">
                <img src={chat}/>
                <p className="text-[#494949] ma:text-2xl text-center">Start conversing to see your messages here</p>
            </div>)
        }
        </div>
        </>
    )
}
export default MessagedProfiles;