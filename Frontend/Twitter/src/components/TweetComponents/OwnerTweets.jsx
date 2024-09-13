import React, { useEffect, useState } from "react";
import AdminTweetCont from "./AdminTweetCont.jsx";

function GetOwnerTweets(){
    const [tweet, setTweets] = useState([])

const gettweets = async()=>{
  try {
      const token = localStorage.getItem("accessToken")
      if(!token){
          console.error("No token found in localStorage")
          return;
      }
      const response = await fetch(`http://localhost:8000/api/v1/tweets/ownerTweets`,{
          method: "GET",
          headers:{
              Authorization: `Bearer${token}`,
              "Content-Type": "application/json"
          }
      })
      if(response.ok){
          const tweets = await response.json()
          setTweets(tweets.data)
  
      }else{
          console.error("error while fetching admin tweets", response.statusText)
      }
  } catch (error) {
console.error("tweet fetch error", error)
  }
}
useEffect(()=>{
    gettweets()
    
},[])
    return(
        <>
        <div>
             { tweet.length>0?
                tweet.map((tweets, index)=>
                <div key={index}>
                   <AdminTweetCont tweet={tweets}/>
                </div>
                ): <p>No tweets</p>
             }
        </div>
        </>
    )
}
export default GetOwnerTweets;