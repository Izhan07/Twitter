import React, {useEffect, useState, createContext} from "react";
import Input from "../Input.jsx";
import { useForm } from "react-hook-form";
import UserProfile from "../Pages/UserProfile.jsx";
import { Link, useNavigate } from "react-router-dom";
import Search from "../../img/search.png"
function SearchUser(){
    const {handleSubmit, register} = useForm()
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const search = async(data)=>{
        if(loading) return;
        setLoading(true)
        try {
            const token = localStorage.getItem("accessToken")
            if(!token){
                console.error("No token found in localStorage")
            }
            const response = await fetch(`http://localhost:8000/api/v1/users/searchUser`, {
                method: "POST",
                headers:{
                    Authorization: `Bearer${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if(response.ok){
                const User = await response.json()
                setUser(User.data)
                
            }else{
                console.error("No user found", response.statusText)
            }
        } catch (error) {
            console.error("Something went wrong while searching user")
            
        }finally{
            setLoading(false)
        }

    }
     const data = async()=>{
        navigate("/Userprofile", {state : {user : user}})
     }
  
    
    return(
        <>
        <div className="h-dvh w-full bg-[#201f1f] text-[#E0E0E0] px-2">
        <form className=" py-2 px-1 flex items-center justify-between" onSubmit={handleSubmit(search)} >
            <Input
            labelClass = "font-semibold text-xl"
            className="w-[85%] mx-2 py-1 px-2 outline-none bg-[#494949] rounded-lg"
            label = "Search"
            type = "text"
            placeholder = "Search Username"
            {...register("username", {
                required: true
            })}
            />
            <button type="submit">
                <img className="h-6" src={Search}/>
            </button>
        </form>
        <div className="bg-[#494949] w-full h-10 flex items-center px-2 rounded-lg">
            {
                loading? (<p>searching...</p>):
                user? <div>
                 <button onClick={data}>{user.username}</button>
                </div> : 
                <p></p>
            }
        </div>
        </div>
        </>
    )
}
export default SearchUser;