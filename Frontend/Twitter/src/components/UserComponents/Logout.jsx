import React from "react";
import { logout as authLogout } from "../../store/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


function Logout(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logout = async()=>{
      try {
        const token = localStorage.getItem("accessToken")
        if(!token){
            console.error("No token found in localStorage")
            return;
        }

          const response = await fetch(`http://localhost:8000/api/v1/users/logout`,{
              method: "POST",
              headers:{
                Authorization: `Bearer${token}`,
                  "Content-Type": "application/json"
              },
          })
          if(response.ok){
            const res = await response.json()
            console.log(res)
              dispatch(authLogout())
              localStorage.removeItem("accessToken")
              localStorage.removeItem("userId")
              localStorage.removeItem("username")
              dispatch(authLogout())
              navigate("/login")
          }
      } catch (error) {
        console.error("Something went wrong while loggingOut User", error)
      }
    }



    return(
        <>
        <button onClick={logout} >Logout</button>
        </>
    )
}
export default Logout;