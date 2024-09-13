import React,{useEffect, useState} from "react";
import {TweetContainer} from "../index.js"

function GetUsertweets({user}){
    const [usertweets, setUserTweets] = useState([])
    const getTweets = async()=>{
        try {
            const token = localStorage.getItem("accessToken")
            if(!token){
                console.error("No token found in localStorage")
                return;
            }
            const response = await fetch(`http://localhost:8000/api/v1/tweets/user/${user.data._id}`,{
                method: "GET",
                headers:{
                    Authorization: `Bearer${token}`,
                    "Content-Type": "application/json"
                }
            })
            if(response.ok){
                const tweets = await response.json()
                setUserTweets(tweets.data)
                console.log(usertweets)
            }else{
                console.error("Fetching user tweets failed", response.message)
            }
        } catch (error) {
            console.error("Something went wrong while fetching tweets ")
        }
    }
    useEffect(()=>{
        getTweets()
    },[])
    return(
        <>
        {
            usertweets.length > 0 ? (usertweets.map((tweet, index)=> <div key={index}>
                <TweetContainer tweet={tweet} />
            </div>)) : <p>Loading...</p>
        }
        </>
    )
}
export default GetUsertweets;