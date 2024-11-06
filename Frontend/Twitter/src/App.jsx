import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/auth.js";
import { useEffect, useState } from "react";
import {SideBar} from "./components/index.js"
import { useSelector } from "react-redux";
function App() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(false)
    const dispatch = useDispatch()
    const getUser = async()=>{
      try {
        const token = localStorage.getItem("accessToken")
        if(!token){
          console.error("No token found")
        }
        const response = await fetch(`https://twitter-kbki.onrender.com/api/v1/users/currentUser`,{
          method: "GET",
          headers:{
            Authorization: `Bearer${token}`,
            "Content-Type": "application/json"
          }
        })
        if(response.ok){
          dispatch(login())
          setLoading(false)
          setUser(true)
        }else{
          dispatch(logout())
          setLoading(false)
          setUser(false)
        }
      } catch (error) {
        console.error("Something went wrong while checking Authorization",error)
      }
    }
    useEffect(()=>{
       getUser()
    },[])

 
  return !loading? (
    <>
   <div className="flex md:h-dvh h-[79%]   flex-col-reverse  relative md:flex md:static md:flex-row bg-[#201f1f] text-[#E0E0E0] ">
   <Outlet/>
   </div>
    </>
  ) : null
}

export default App;
