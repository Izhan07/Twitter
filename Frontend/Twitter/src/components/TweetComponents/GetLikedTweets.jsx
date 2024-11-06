import React, {useEffect, useState} from "react";
import TweetContainer from "./TweetContainer";
import { useSelector } from "react-redux";



function GetlikedTweets(){
    const userdata = useSelector((state)=> state.auth.status)
    const [likedTweets, setLikedTweets] = useState([])
    const userlikedTweets = async()=>{
        try {
            const token = localStorage.getItem("accessToken")
            if(!token){
                console.error("No token found in localStorage")
                return;
            }
            const response = await fetch(`https://twitter-kbki.onrender.com/api/v1/likes/tweets`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer${token}`,
                    "Content-Type": "application/json"
                }
            })
            if(response.ok){
                const tweets = await response.json()
                setLikedTweets(tweets.data)
               
            }else{
                console.error("Liked tweets fetching failed", response.statusText)

            }
        } catch (error) {
            console.error("Something went wrong while fetching liked tweets", error)
        }
    }
    useEffect(()=>{
        userlikedTweets()
    },[])
    return(
        <>
        {
            likedTweets.length > 0 ? (
                likedTweets.map((tweet,index)=> <div key={index}>
                {console.log(tweet)}
                </div>)
            ) : <div className="w-full h-full flex items-center justify-center  bg-[#201f1f]">
            <div className="w-32 h-32 border-t-4 border-[#494949] border-solid rounded-full animate-spin "></div>
        </div>
        }
        </>
    )
}
export default GetlikedTweets;