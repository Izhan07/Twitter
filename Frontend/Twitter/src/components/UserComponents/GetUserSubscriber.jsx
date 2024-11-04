import React,{useEffect, useState} from "react";
import SubscriberCont from "./SubscriberCont.jsx";

function GetUserSubscribers({user}){
    const [Subscribers, setSubscribers] = useState([])
    const [loading, setLoading] = useState(true)
    const userSubscribers = async()=>{
        try {
            setLoading(true)
            const token = localStorage.getItem("accessToken")
            if(!token){
                console.error("No token found in localstorage")
                return;
            }
            const response = await fetch(`http://localhost:8000/api/v1/subs/u/${user.user.data._id}`, {
                method: "GET",
                headers:{
                    Authorization: `Bearer${token}`,
                    "Content-Type": "application/json"
                }
            })
            if(response.ok){
                const subscribers = await response.json()
                setSubscribers(subscribers.data)
            }else{
                console.error("fetch user subscriber failed", response.message)
            }
        } catch (error) {
            console.error("Something went wrong while fetching user subscribers")
        } finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        userSubscribers()
    },[])
    return(
        <>
        <div className="w-full h-dvh flex flex-col bg-[#201f1f] text-[#E0E0E0] px-2 py-1" >
        {
            loading ? (<div className="w-full h-full flex items-center justify-center  bg-[#201f1f]">
                <div className="w-32 h-32 border-t-4 border-[#494949] border-solid rounded-full animate-spin "></div>
            </div>) :
            Subscribers.length > 0 ? (
                Subscribers.map((subscriber, index)=> <div key={index}>
                    <SubscriberCont subscriber={subscriber}/>
                </div>)
            ) : (<div>
                <p>No User Found</p>
            </div>)
        }
        </div>
        </>
    )
}
export default GetUserSubscribers;