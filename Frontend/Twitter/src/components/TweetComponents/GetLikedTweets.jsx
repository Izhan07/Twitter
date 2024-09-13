import React, {useEffect, useState} from "react";
import TweetContainer from "./TweetContainer";



function GetlikedTweets(){
    const [likedTweets, setLikedTweets] = useState([])
    const userlikedTweets = async()=>{
        try {
            const token = localStorage.getItem("accessToken")
            if(!token){
                console.error("No token found in localStorage")
                return;
            }
            const response = await fetch(`http://localhost:8000/api/v1/likes/tweets`, {
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
            ) : <p>Loading...</p>
        }
        </>
    )
}
export default GetlikedTweets;