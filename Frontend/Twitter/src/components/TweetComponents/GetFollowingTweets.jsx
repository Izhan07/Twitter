import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import TweetContainer from "./TweetContainer"
import empty from "../../img/tweet.png"
function GetFollowingTweets(){
    
    const [tweets, setTweets] = useState([])
   const [loading, setLoading] = useState(true)

    const followingTweets = async()=>{
      try {
        setLoading(true)
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
          const response = await fetch(`https://twitter-kbki.onrender.com/api/v1/tweets/fellowTweets/${id}`,{
              method: "GET",
              headers:{
                  Authorization: `Bearer${token}`,
                  "Content-Type": "application/json"
              }
          })
          if(response.ok){
            setLoading(false)
              const tweet = await response.json()
              setTweets(tweet.data)
          }else{
            setLoading(false)
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
       
        { loading? 
        (<div className="w-full h-full flex items-center justify-center  bg-[#201f1f]">
         <div className="w-32 h-32 border-t-4 border-[#494949] border-solid rounded-full animate-spin "></div>
         </div>) :
            tweets.length > 0 ?
         (
                tweets.map((tweet, index)=> <div  key={index}>
                    <TweetContainer tweet={tweet}/>
                </div>)
         ) 
            : (<div className="flex flex-col items-center justify-center w-full h-full">
                <img src={empty}/>
                <p className="text-[#494949] ma:text-2xl text-center" >No Following Tweets Found</p>
            </div>)
        }
        </>
    )
}
export default GetFollowingTweets;