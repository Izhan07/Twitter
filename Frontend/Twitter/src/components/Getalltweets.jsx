import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TweetContainer from "./TweetContainer.jsx";

function AllTweets(){
  const [Tweets, setTweets] = useState([])
  const [lastTweetId, setLastTweetId] = useState(null)
  const [loading, setLoading] = useState(false)

   
    const loadMoreTweets = async (initialLoad = false) => {
       if(loading) return;
       setLoading(true)
       try {
         const token = localStorage.getItem('accessToken'); // Retrieve the token
        
         if (!token) {
           console.error("No token found in localStorage");
           return;
         }
         const url = initialLoad ? `http://localhost:8000/api/v1/tweets/tweets?limit=10`: `http://localhost:8000/api/v1/tweets/tweets?limit=10${lastTweetId || ""}`
       
         const response = await fetch(url, {
           method: "GET",
           headers: {
             Authorization: `Bearer${token}`, // Ensure there's a space after "Bearer"
             "Content-Type": "application/json"
           }
         });
       
         if (response.ok) {
           const tweets = await response.json();
           setTweets(prevTweets => [...prevTweets, ...tweets.data])
           setLastTweetId(tweets.lastTweetId)
           console.log(lastTweetId)
         } else {
           console.error("Error fetching tweets:", response.status, response.statusText);
         }
       } catch (error) {
        console.error("Error loading more Tweets", error)
       }finally{
        setLoading(false)
        
       }
      
      };
      useEffect(()=>{
        const handleScroll = ()=>{
          if(window.innerHeight + window.scrollY >= document.body.offsetHeight && !loading){
            loadMoreTweets()
            console.log(lastTweetId)
          }
        
        }
        window.addEventListener("scroll", handleScroll)
        return()=>(
          window.removeEventListener("scroll", handleScroll)
        )
      },[lastTweetId,loading])
      useEffect(()=>{
        loadMoreTweets()
        
      },[])
     
      const renderTweets = ()=>{
        
        return  Tweets.map((tweet,index)=> <div key={index}>
           <TweetContainer tweet={tweet}  />
          </div>)
        
      }

    return(
        <>
        {renderTweets()}
        {loading && <p>Loading more tweets</p>}
        </>
    )
}
  export default AllTweets;
  