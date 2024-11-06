import React, { useEffect, useState } from "react";
import AdminTweetCont from "./AdminTweetCont.jsx";
import empty from "../../img/tweet.png"
function GetOwnerTweets(){
    const [tweet, setTweets] = useState([])
    const [loading, setLoading] = useState(true)
const gettweets = async()=>{
  try {
      setLoading(true)
      const token = localStorage.getItem("accessToken")
      if(!token){
          console.error("No token found in localStorage")
          return;
      }
      const response = await fetch(`https://twitter-kbki.onrender.com/api/v1/tweets/ownerTweets`,{
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
  } finally{
    setLoading(false)
  }
}
useEffect(()=>{
    gettweets()
    
},[])
    return(
        <>
        <div className="w-full   flex   p-3 flex-wrap justify-center  pb-16 md:pb-0 md:justify-normal  ">
             {
               loading ? (<div className="w-full h-full flex items-center justify-center  bg-[#201f1f]">
                <div className="w-32 h-32 border-t-4 border-[#494949] border-solid rounded-full animate-spin "></div>
                </div>) :
             tweet.length>0?
                tweet.map((tweets, index)=>
                <div className="h-80 w-60 flex items-center justify-center my-2 "  key={index}>
                   <AdminTweetCont tweet={tweets}/>
                </div>
                ): (<div className="flex flex-col items-center justify-center w-full">
                    <img src={empty}/>
                    <p className="text-[#494949] ma:text-2xl text-center">No Tweets Found</p>
                </div>)
             }
        </div>
        </>
    )
}
export default GetOwnerTweets;