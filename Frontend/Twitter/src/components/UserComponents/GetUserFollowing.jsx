import React,{useEffect, useState} from "react";
import SubscriberCont from "./subscriberCont";

function GetUserFollowing({user}){
    const [Following, setFollowing] = useState([])
    const userFollowing = async ()=>{
        try {
            const token = localStorage.getItem("accessToken")
            if(!token){
                console.error("No tokenfound in localstorage")
                return;
            }
            const response = await fetch(`http://localhost:8000/api/v1/subs/f/${user.data._id}`, {
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
        }
    }
    useEffect(()=>{
        userFollowing()
    },[])
    return(
        <>
        {
            Following.length > 0 ? (
                Following.map((following,index)=> <div key={index}>
                    <SubscriberCont subscriber={following}/>
                </div> )
            ) : <p>Loading...</p>
        }
        </>
    )
}
export default GetUserFollowing;