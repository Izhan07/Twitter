import React, {useState, useRef, useEffect} from "react";
import { Link } from "react-router-dom";
import {Logout} from "../index.js"
import close from "../../img/cross.png"
import cover from "../../img/cover.jpg"
function ProfileCont({profile}){
    const [subscibe, setSubscribe] = useState(profile.data.isSubscribed)
    const [userId, setUserId] = useState(null)
    const menuRef = useRef()
    const openMenu = ()=>{
        menuRef.current.style.right = "0px";
    }
    const closeMenu = ()=>{
        menuRef.current.style.right = "-350px"
    }
    useEffect(()=>{
        const Id =  localStorage.getItem("userId")
        setUserId(Id)
    },[])
   const toggleSubscribe =async ()=>{
    try {
        const token = localStorage.getItem("accessToken")
        if(!token){
            console.error("No token found in localStorage")
            return;
        }
        const response = await fetch(`https://twitter-kbki.onrender.com/api/v1/subs/c/${profile.data.username}`, {
            method: "POST",
            headers:{
                Authorization: `Bearer${token}`,
                "Content-Type": "application/json"
            }
        })
        if(response.ok){
            const subs = await response.json()
            setSubscribe(!subscibe)
        }else{
            console.error("Account Subscribe error",response.statusText)
        }
    } catch (error) {
        console.error("Something went wrong while account subscribe", error)
    }
   }
    return(
        <>
        <div className="flex w-full  bg-[#201f1f] text-[#E0E0E0] pb-2 ">
        <div className="relative gap-20 flex flex-col  w-full" >
            <div  className="w-full h-96 ">
                {
                    profile.data.coverimage? <img className="w-full h-96 object-cover" src={profile.data.coverimage}/> : <img className="w-full h-96 object-cover" src={cover}/>
                }
            </div>
            <div className="h-44 w-44 rounded-full absolute top-72 left-2">
                <img  className="h-44 w-44 rounded-full object-cover" src={profile.data.avatar}/>
            </div>
           <div>
         <div className="py-2 px-3  flex flex-col justify-center  ">
         <div className="font-bold text-2xl flex justify-between w-full ">{profile.data.fullname} 
          {
            userId !== profile.data._id ?(  <Link className="md:bg-[#33CBFE] md:text-white md:px-4 md:rounded-2xl md:w-40 text-center md:py-2 text-[#E0E0E0] font-semibold text-[1.0rem]" to="/chats" state={{user: profile.data}}>
                Message
                </Link>) : null
          }
         </div>
         <div className="font-bold text-2xl">{profile.data.username}</div>
         </div>
           <div className="flex items-center justify-end px-2 gap-10 mb-1">
                <Link className="md:bg-[#33CBFE] md:text-white md:px-4 md:rounded-2xl md:w-40 text-center md:py-2 text-[#E0E0E0] font-semibold" to="/followers" state={{user: profile}}>Followers</Link>
                <Link  className="md:bg-[#33CBFE] md:text-white md:px-4 md:rounded-2xl md:w-40 text-center md:py-2 text-[#E0E0E0] font-semibold" to="/following" state={{user: profile}}>Following</Link>
              {
                userId === profile.data._id ?   <button className="px-4 rounded-2xl w-40 bg-[#494949]  py-2" onClick={openMenu}>Setting</button> : null
              }
            </div>
           <div className="flex items-center gap-4">
           <div className="px-2 ">{
                 subscibe? (<button className="bg-[#33CBFE] text-white px-3 py-2 w-44 rounded-2xl" onClick={toggleSubscribe} >Unsubscribe</button>)
                  :
                   (<button className="bg-[#33CBFE] text-white px-3 py-2 w-44 rounded-2xl" onClick={toggleSubscribe}>Subscribe</button>)
                 }</div>
            <div className="font-semibold text-xl">{profile.data.subscriberCount}</div>
           </div>
           </div>
           

        </div>
        <div ref={menuRef} className="fixed right-[-350px] duration-200 h-dvh w-52 py-2 px-3 bg-[#201f1f] text-[#E0E0E0] " >
            <button className="" onClick={closeMenu} >
                <img className="h-6 w-6 object-cover" src={close}/> 
            </button>
            <ul className="font-semibold">
                <Link to="/updateAvatar">
                <li className="my-5 hover:cursor-pointer hover:bg-[#858484] hover:bg-opacity-50 py-1 px-2 rounded-xl">Change Avatar</li>
                </Link>
               <Link to="/updateCover">
               <li className="my-5 hover:cursor-pointer  hover:bg-[#858484] hover:bg-opacity-50 py-1 px-2 rounded-xl">Change Cover</li>
               </Link>
               <Link to="/changeCredantials">
               <li className="my-5 hover:cursor-pointer  hover:bg-[#858484] hover:bg-opacity-50 py-1 px-2 rounded-xl">Change Password</li>
               </Link>
               <Link to="/updateDetails">
               <li className="my-5 hover:cursor-pointer  hover:bg-[#858484] hover:bg-opacity-50 py-1 px-2 rounded-xl">Change Name</li>
               </Link>
                <li className="my-5 hover:cursor-pointer  hover:bg-[#858484] hover:bg-opacity-50 py-1 px-2 rounded-xl"><Logout/></li>
            </ul>
        </div>
        </div>
        </>
    )
}
export default ProfileCont;