import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import TweetContainer from "./TweetContainer"

function GetFollowingTweets(){
    
    const [tweets, setTweets] = useState([])
   

    const followingTweets = async()=>{
      try {
          const token = localStorage.getItem("accessToken")
          if(!token){
              console.error("No tokenfound in localStorage")
              return;
          }
          const id = localStorage.getItem("userId")
          if(!id){
            console.error("No user Id Found")
            return;
          }
          console.log(id)
          const response = await fetch(`http://localhost:8000/api/v1/tweets/fellowTweets/${id}`,{
              method: "GET",
              headers:{
                  Authorization: `Bearer${token}`,
                  "Content-Type": "application/json"
              }
          })
          if(response.ok){
              const tweet = await response.json()
              setTweets(tweet.data)
          }else{
              console.error("No following Tweets Found")
          }
      } catch (error) {
        console.error("Something wemt wrong while fetching Following tweets", error)
      }

    }
    useEffect(()=>{
        followingTweets()
    },[])


    return(
        <>
        {
            tweets.length > 0 ? (
                tweets.map((tweet, index)=> <div key={index}>
                    <TweetContainer tweet={tweet}/>
                </div>)
            ) : <p>no tweets found</p>
        }
        </>
    )
}
export default GetFollowingTweets;