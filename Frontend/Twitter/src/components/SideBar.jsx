import React,{useState, useEffect} from "react";
import home from "../img/home.png"
import search from "../img/search.png"
import explore from "../img/explore.png"
import message from "../img/message.png"
import create from "../img/create.png"
import logo from "../img/twitter.png"

import { Link } from "react-router-dom";

function SideBar(){
    const [User, setUser] = useState(null)
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
             const user = await response.json()
             setUser(user.data)
            }else{
            console.error("No user found", response.statusText)
            }
        } catch (error) {
            console.error("Something went wrong while fetching user",error)
        }
    }
    useEffect(()=>{
        getUser()
    },[])

    const sideBarItems = [
        {
            name: "Home",
            slug: "/",
            src: home
        },
        {
            name: "Search",
            slug: "/search",
            src: search
        },
        {
            name: "Explore",
            slug: "/explore",
            src: explore
        },
        {
            name: "Messages",
            slug: "/messages",
            src: message
        },
        {
            name: "Create",
            slug: "/createPost",
            src: create
        },
      
    ]
    return(
        <>
      <div className="md:w-52 md:h-dvh md:border-r-2 z-10 bg-[#201f1f] border-t-2 border-[#494949] text-[#E0E0E0] md:border-[#494949] p-2   bottom-0 fixed w-full h-16  md:static md:z-0 md:border-t-0 ">
        <div className="p-0 m-0 "> 
          <img className="w-44 hidden md:block" src={logo}/>
        </div>
        <ul className="flex md:flex-col justify-evenly my-2 md:my-0 " >
          {User ? (
            <>
              {sideBarItems.map((item, index) => (
                <Link to={item.slug} key={index}>
                  <li className=" md:h-12 md:my-4 mx-0 px-2 md:rounded-2xl flex md:gap-7 items-center hover:cursor-pointer rounded-full hover:bg-[#858484] hover:bg-opacity-50 h-10 w-10 md:w-full">
                    <img className="h-6" src={item.src} alt={item.name} />
                    <p className="font-semibold hidden md:block">{item.name}</p>
                  </li>
                </Link>
              ))}
              <Link to="/profile">
                <li className="md:h-12 md:w-full md:my-4 px-2 md:rounded-2xl flex md:gap-4 items-center hover:cursor-pointer hover:bg-[#858484] hover:bg-opacity-50 h-10 w-10 rounded-full">
                  <img className="md:h-9 md:w-9 w-6 h-6 rounded-full object-cover" src={User.avatar} alt="Profile" />
                  <p className="font-semibold hidden md:block">Profile</p>
                </li>
              </Link>
            </>
          ) : (
            <div>
              <p></p>
            </div>
          )}
        </ul>
      </div>
    </>
    )
}
export default SideBar;