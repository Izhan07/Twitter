import React from "react";
import { useLocation } from "react-router-dom";
import {GetUserSubscribers} from "../index.js"
function Followers(){
    const location = useLocation()
    const user = location.state
    return(
        <>
        <GetUserSubscribers user={user}/>
        
        </>
    )
}
export default Followers;