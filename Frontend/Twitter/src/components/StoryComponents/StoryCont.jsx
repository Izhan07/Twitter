import React from "react";
import { useLocation,Link } from "react-router-dom";
import close from "../../img/cross.png"
function StoryCont(){
       const location = useLocation()
       const data = location.state
       const url = data.story.story.split(".").pop()
      
    return(
        <>
        <div className="h-dvh w-full flex items-center justify-center  bg-[#201f1f] text-[#E0E0E0] py-2 p-2 relative ">
            <div>
            <Link to="/">
            <button className="absolute top-1 right-1 " >
                <img className="h-6" src={close}/>
            </button>
            </Link>
            </div>
      {
        url === "mp4" ? (
            <div className="h-[35rem]  w-96"> 
           
                <video className="h-[35rem] w-96 object-cover"
                autoPlay
                controls 
                controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
               
                >
                    <source src={data.story.story} type="video/mp4"/>
                </video>
            </div>
        ) : (
            <div className="h-[35rem] w-96">
               
            <img className="h-[35rem] w-96 object-cover" src={data.story.story}/>
            </div>
        )
      }
      </div>
        </>
    )
}
export default StoryCont;