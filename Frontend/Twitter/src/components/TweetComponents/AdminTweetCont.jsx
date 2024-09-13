import React from "react";
import DeleteTweet from "./DeleteTweet.jsx";
import UpdateTweet from "./UpdateTweet.jsx";

function AdminTweetCont({tweet}){


    return(
        <>
        <div>
            {
                tweet.tweetImage?  <div>
                    <img src={tweet.tweetImage}/>
                    <UpdateTweet tweet={tweet}/>
                </div> : <div><p>{tweet.content}
                    
                </p><UpdateTweet tweet={tweet}/> </div>
            }
        </div>
        </>
    )
}
export default AdminTweetCont;