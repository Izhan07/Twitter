import React,{useEffect, useState} from "react";
import {TweetContainer} from "../index.js"
import empty from "../../img/tweet.png"
function GetUsertweets({user}){
    const [usertweets, setUserTweets] = useState([])
    const [loading, setLoading] = useState(true)
    const getTweets = async()=>{
        try {
            loading(true)
            const token = localStorage.getItem("accessToken")
            if(!token){
                console.error("No token found in localStorage")
                return;
            }
            const response = await fetch(`http://localhost:8000/api/v1/tweets/user/${user}`,{
                method: "GET",
                headers:{
                    Authorization: `Bearer${token}`,
                    "Content-Type": "application/json"
                }
            })
            if(response.ok){
                const tweets = await response.json()
                setUserTweets(tweets.data)
            }else{
                console.error("Fetching user tweets failed", response.message)
            }
        } catch (error) {
            console.error("Something went wrong while fetching tweets")
        } finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        getTweets()
    },[])
    return(
        <>
        {
            loading ? (<div className="w-full h-full flex items-center justify-center  bg-[#201f1f]">
                <div className="w-32 h-32 border-t-4 border-[#494949] border-solid rounded-full animate-spin "></div>
            </div>) :
            usertweets.length > 0 ? (usertweets.map((tweet, index)=> <div key={index}>
                <TweetContainer tweet={tweet} />
            </div>)) : (
                <div className="flex flex-col items-center justify-center w-full h-full">
                <img src={empty}/>
                <p className="text-[#494949] ma:text-2xl text-center" >No Following Tweets Found</p>
            </div>
            )
        }
        </>
    )
}
export default GetUsertweets;