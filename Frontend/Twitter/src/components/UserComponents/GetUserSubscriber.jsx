import React,{useEffect, useState} from "react";
import SubscriberCont from "./subscriberCont";

function GetUserSubscribers({user}){
    const [Subscribers, setSubscribers] = useState([])
    const userSubscribers = async()=>{
        try {
            const token = localStorage.getItem("accessToken")
            if(!token){
                console.error("No token found in localstorage")
                return;
            }
            const response = await fetch(`http://localhost:8000/api/v1/subs/u/${user.data._id}`, {
                method: "GET",
                headers:{
                    Authorization: `Bearer${token}`,
                    "Content-Type": "application/json"
                }
            })
            if(response.ok){
                const subscribers = await response.json()
                setSubscribers(subscribers.data)
                console.log(subscribers)
            }else{
                console.error("fetch user subscriber failed", response.message)
            }
        } catch (error) {
            console.error("Something went wrong while fetching user subscribers")
        }
    }
    useEffect(()=>{
        userSubscribers()
    },[])
    return(
        <>
        {
            Subscribers.length > 0 ? (
                Subscribers.map((subscriber, index)=> <div key={index}>
                    <SubscriberCont subscriber={subscriber}/>
                </div>)
            ) : <p>Loading...</p>
        }
        </>
    )
}
export default GetUserSubscribers;