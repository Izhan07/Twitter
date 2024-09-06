import React from "react";
import { logout as authLogout } from "../store/auth";
import { useDispatch } from "react-redux";

function Logout(){
    const dispatch = useDispatch()

    const logout = async()=>{
        const response = fetch(`http://localhost:8000/api/v1/users/logout`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
        })
        if(response.ok){
            dispatch(authLogout)
        }
    }



    return(
        <>
        <button onClick={logout} >Logout</button>
        </>
    )
}
export default Logout;