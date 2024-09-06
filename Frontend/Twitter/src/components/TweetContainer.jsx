import React from "react";
import "./components.css"
import Tweetlike from "./Tweetlike.jsx"
import PostComment from "./Addcomment.jsx";
import GetTweetComments from "./GetTweetComments.jsx";


function TweetContainer({tweet}){


    
    return(
        <>
        <div className="cont">
          <div>
          <img src={tweet.avatar}/>
          <h3>{tweet.username}</h3>
          </div>
        {
            tweet.tweetImage? <div>
                <div>
                    {tweet.content}
                </div>
                <div>{tweet.tweetImage}</div>
            </div> : <div>{tweet.content}</div>
        }
        <div>
          <div>
               <Tweetlike tweet={tweet}/>
          </div>
          <div>
            
          </div>
        </div>
            <GetTweetComments tweet={tweet}/>
        </div>
        </>
    )
}
export default TweetContainer