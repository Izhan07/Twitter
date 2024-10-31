import React,{useState} from "react";
import DeleteTweet from "./DeleteTweet.jsx";
import UpdateTweet from "./UpdateTweet.jsx";
import UpdateModal from "./UpdateModal.jsx"
import { Link } from "react-router-dom";
function AdminTweetCont({tweet}){
    const [isUpdateModalOpen, setUpdateModal] = useState(false)
    const isOpen = ()=>{
        setUpdateModal(true)
    }
    const isClose = ()=>{
        setUpdateModal(false)
    }
    return(
        <>
        
        
            {
                tweet.tweetImage?  <div className="bg-[#494949] p-3 rounded-xl hover:bg-opacity-35 duration-300 h-80 w-60 m-2">
                  <Link to={`/post/${tweet.Id}`} state={{tweet: tweet}}><img className="h-64 w-56 object-cover rounded-xl" src={tweet.tweetImage}/></Link>
                   <button className="bg-[#33CBFE] text-white px-2 py-1 rounded-2xl w-32 mt-2" onClick={isOpen}>
                    Update
                   </button>
                   <UpdateModal isOpen={isUpdateModalOpen} isClose={isClose} >
                    <UpdateTweet tweet={tweet}/>
                   </UpdateModal>
                </div> : <div  className="bg-[#494949] p-3 rounded-xl hover:bg-opacity-35 duration-300 w-60 h-80 flex flex-col justify-center  m-2">
                <Link to={`/post/${tweet.Id}`} state={{tweet: tweet}}>  <p className="overflow-y-hidden">{tweet.content}</p></Link>
                <div className="flex-grow"></div>
                <button className="bg-[#33CBFE] text-white px-2 py-1 rounded-2xl w-32  mt-2 " onClick={isOpen}>
                    Update
                   </button>
                   <UpdateModal isOpen={isUpdateModalOpen} isClose={isClose} >
                    <UpdateTweet tweet={tweet}/>
                   </UpdateModal>
                </div>
            }
        
        
        </>
    )
}
export default AdminTweetCont;