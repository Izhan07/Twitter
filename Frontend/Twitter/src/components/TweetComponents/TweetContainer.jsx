import React from "react";

import Tweetlike from "./Tweetlike.jsx"
import PostComment from "../CommentComponents/Addcomment.jsx";
import GetTweetComments from "../CommentComponents/GetTweetComments.jsx";


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
                <div><img src={tweet.tweetImage}/></div>
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