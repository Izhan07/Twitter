import React,{useState} from "react";
import comment from "../../img/comment.png"
import Tweetlike from "./Tweetlike.jsx"
import PostComment from "../CommentComponents/Addcomment.jsx";
import GetTweetComments from "../CommentComponents/GetTweetComments.jsx";
import Modal from "./Modal.jsx"

function TweetContainer({tweet}){
 
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const openCommentModal = () => {
        setIsCommentModalOpen(true);
      };
    
      const closeCommentModal = () => {
        setIsCommentModalOpen(false);
      };
      
    return(
        <>
        <div className=" w-[32rem] min-h-[25rem] border-2 border-[#494949]   bg-[#201f1f] text-[#E0E0E0] relative 
          max-[536px]:w-[17rem] px-1 
        ">
          <div className=" flex items-center p-2 gap-3 ">
          <img className="h-12 w-12 rounded-full object-cover" src={tweet.avatar || tweet.user.avatar}/>
          <h3 className="font-semibold">{tweet.username || tweet.user.username}</h3>
          </div>
        {
            tweet.tweetImage? <div className="flex w-full flex-col items-end justify-center">
                <div className="w-full text-center">
                    {tweet.content}
                </div>
                <div className="w-full h-96 flex items-center justify-center"><img className="w-[30rem] max-[536px]:w-[17rem] max-[536px]:h-80 h-80 object-cover" src={tweet.tweetImage}/></div>
            </div> : <div className="w-full text-center my-2">{tweet.content}</div>
        }
      <div className="flex items-center gap-3 px-3 py-2 bottom-0 absolute ">
       <div className="flex items-center">
       <Tweetlike tweet={tweet}/>
       </div>
       <div className="flex items-center">
      <button onClick={openCommentModal}>
       <img className="h-6 w-6 object-cover" src={comment}/>
      </button>
       </div>
      </div>
           
        </div>
        <Modal tweet={tweet} isOpen={isCommentModalOpen} onClose={closeCommentModal}>
        <GetTweetComments tweet={tweet} />
       
      </Modal>
        </>
    )
}
export default TweetContainer