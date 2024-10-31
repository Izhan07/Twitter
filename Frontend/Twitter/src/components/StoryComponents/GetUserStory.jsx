import React,{useState, useEffect} from "react";
import {Link} from "react-router-dom"  
import Input from "../Input";


function GetUserStory(){
    const [userStory, setUserStory] = useState([])
    const [storystatus, setStoryStatus] = useState()
   
    const getStory = async()=>{
        try {
            const token = localStorage.getItem("accessToken")
            if(!token){
                console.error("No token found in localStorage")
                return;
            }
            const response = await fetch(`http://localhost:8000/api/v1/story/`,{
                method: "GET",
                headers:{
                    Authorization: `Bearer${token}`,
                    "Content-Type": "application/json"
                }
            })
            if(response.ok){
                const story = await response.json()
             if(story.data[0]){
                setUserStory(story.data[0])
                setStoryStatus(story.data[0].story)
             }else{
                setUserStory(story.data)
             }
                
            }else{
                console.error("fetching user story failed", response.statusText)
            }
        } catch (error) {
            console.error("Something went wrong while fetching user story", error)
        }
    }
    useEffect(()=>{
        getStory()
    },[])
    const uploadStory = async(data)=>{
        try {
            const token = localStorage.getItem("accessToken")
            if(!token){
                console.error("No token found in localStorage")
                return;
            }
            const formData = FormData()
            if(data.story){
                formData.append("story", data.story[0])
            }
            const response = await fetch(``,{
                method: "POST",
                headers:{
                    Authorization: `Bearer${token}`,
                },
                body: formData
            })
        } catch (error) {
            
        }
    }
    return(
        <>
        { 
            storystatus ? 
           <div className="h-[68px] flex items-center justify-center w-[68px] rounded-full border-2 border-[#33CBFE]"> 
            <Link to="/story" state={{story: userStory}}>
            <img className="h-16 w-16  rounded-full object-cover" src={userStory.userDetails.avatar}/>
            </Link>
           </div>
            : <div>
               <Link to="/storyUpload">
               <img className="h-16 w-16 rounded-full object-cover" src={userStory.avatar} />
               </Link>
        
              
              
            </div>
        }
        </>
    )
}
export default GetUserStory;

