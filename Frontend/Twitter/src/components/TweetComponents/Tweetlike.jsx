import React,{useState} from "react";

function Tweetlike({tweet}){
    
    const [liked, setLiked] = useState(tweet.liked)
     const likeTweet = async()=>{
        
        try {
            const token = localStorage.getItem("accessToken" )
        if(!token){
            console.error("No token found in localStorage");
            return;
        }
             const response = await fetch(`https://twitter-kbki.onrender.com/api/v1/likes/toggleL/t/${tweet._id}`,{
                 method: "POST",
                 headers: {
                    Authorization: `Bearer${token}`,
                     "Content-Type": "application/json"
                 }
             })
             if(response.ok){
                 const like = await response.json()
                 setLiked(!liked)
                 console.log(like)
             }else{
                 console.error("like tweet failed", response.message)
     
             }
        } catch (error) {
            console.error("tweet like error", error)
        }
     }
 

    return(
        <>
        {liked?
        <button onClick={likeTweet}>❤️</button> 
        :
         <button onClick={likeTweet}>🤍</button>}
        </>
    )
}
export default Tweetlike;