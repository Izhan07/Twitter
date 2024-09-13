import React, {useEffect, useState} from "react";
import Input from "../Input.jsx";
import { useForm } from "react-hook-form";
import GetUserProfile from "./GetUserProfile.jsx";
import GetUsertweets from "./GetUserTweets.jsx";
import GetUserSubscribers from "./GetUserSubscriber.jsx";
import GetUserFollowing from "./getUserFollowing.jsx";

function SearchUser(){
    const {handleSubmit, register} = useForm()
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)
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
                const user = await response.json()
                setUser(user)
                console.log(user)
            }else{
                console.error("No user found", response.statusText)
            }
        } catch (error) {
            console.error("Something went wrong while searching user")
            
        }finally{
            setLoading(false)
        }

    }
  
    
    return(
        <>
        <form onSubmit={handleSubmit(search)} >
            <Input
            label = "Search"
            type = "text"
            placeholder = "Search Username"
            {...register("username", {
                required: true
            })}
            />
            <button type="submit">search</button>
        </form>
        <div>
            {
                loading? (<p>searching</p>):
                user? <div>
                    <GetUserProfile user={user}/>
                  <GetUserFollowing user={user}/>
                  
                </div> : 
                <p>No user found</p>
            }
        </div>
        </>
    )
}
export default SearchUser;