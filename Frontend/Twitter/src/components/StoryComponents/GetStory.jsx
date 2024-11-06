import React,{useState, useEffect} from "react";
import StoryCont from "./StoryCont";
import { Link } from "react-router-dom";
function GetStory(){
    const [Story, setStory] = useState([])
    const story = async()=>{
       try {
        const token = localStorage.getItem("accessToken")
        if(!token){
            console.error("No token found in lcalstorage")
            return;
        }
        const response = await fetch(`https://twitter-kbki.onrender.com/api/v1/story/get`,{
            method: "GET",
            headers: {
                Authorization: `Bearer${token}`,
                "Content-Type": "application/json"
            }
        })
        if(response.ok){
            const stories = await response.json()
            setStory(stories.data)
        }else{
            console.error("fetching stories failed", response.statusText)
        }
       } catch (error) {
        console.error("Something went wrong while feching stories", error)
       }
    }
    useEffect(()=>{
        story()
    },[])

    return(
        <>
      {
        Story.length > 0? 
                (Story.map((story,index)=>
                <div className="h-[68px] flex items-center justify-center w-[68px] rounded-full border-2 border-[#33CBFE]" key={index}>
                    
                  <Link to="/story" state={{story: story}}>
                  <img className="h-16 w-16  rounded-full object-cover" src={story.userDetails.avatar}/>
                  </Link>
                </div>
                )) : null
      }
        </>
    )
}
export default GetStory;

