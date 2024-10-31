import React,{useEffect, useState} from "react";
import SubscriberCont from "./subscriberCont";

function GetUserFollowing({user}){
    const [Following, setFollowing] = useState([])
    const [loading, setLoading] = useState(true)
    const userFollowing = async ()=>{
        try {
            setLoading(true)
            const token = localStorage.getItem("accessToken")
            if(!token){
                console.error("No tokenfound in localstorage")
                return;
            }
            const response = await fetch(`http://localhost:8000/api/v1/subs/f/${user.user.data._id}`, {
                method: "GET",
                headers:{
                    Authorization: `Bearer${token}`,
                    "Content-Type": "application/json"
                }
            })
            if(response.ok){
                const following = await response.json()
                setFollowing(following.data)
            }else{
                console.error("fetching user following failed", response.message)
            }
        } catch (error) {
            console.error("Something went wrong while fetching user following", error)
        } finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        userFollowing()
    },[])
    return(
        <>
        <div className="w-full h-dvh flex flex-col bg-[#201f1f] text-[#E0E0E0] px-2 py-1">
        {
            loading ? (<div className="w-full h-full flex items-center justify-center  bg-[#201f1f]">
                <div className="w-32 h-32 border-t-4 border-[#494949] border-solid rounded-full animate-spin "></div>
            </div>) :
            Following.length > 0 ? (
                Following.map((following,index)=> <div key={index}>
                    <SubscriberCont subscriber={following}/>
                </div> )
            ) : (<div>
                <p>No User Found</p>
            </div>)
        }
        </div>
        </>
    )
}
export default GetUserFollowing;