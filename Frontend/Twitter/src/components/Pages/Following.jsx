import React from "react";
import {GetUserFollowing} from "../index.js"
import { useLocation } from "react-router-dom";
function Following(){
    const location = useLocation()
    const user = location.state
    return(
        <>
        <GetUserFollowing user={user}/>
        </>
    )
}
export default Following;