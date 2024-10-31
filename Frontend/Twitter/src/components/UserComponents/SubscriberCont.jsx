import React from "react";
import { Link } from "react-router-dom";
function SubscriberCont({subscriber}){
    return(
        <>

        <Link to="/Userprofile" state={{user:subscriber}}>
        <div className="px-2 py-1 flex items-center gap-4 h-24 w-full  bg-[#858484] hover:bg-opacity-50 rounded-3xl my-2">
            <div className="h-12 w-12 rounded-full object-cover" >
                <img className="h-12 w-12 rounded-full object-cover" src={subscriber.avatar}/>
            </div>
            <div>
                <p className="font-semibold">
                    {subscriber.username}
                </p>
            </div>
        </div>
        </Link>
        </>
    )
}
export default SubscriberCont;