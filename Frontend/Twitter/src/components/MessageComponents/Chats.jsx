import React, { useState, useEffect } from "react";
import SendMessage from "./SendMessage";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";

let socket;

function Chats() {
  const [Chats, setChats] = useState([]);
  const userId = localStorage.getItem("userId");
  const location = useLocation();
  const user = location.state;
  

  useEffect(() => {
    socket = io("http://localhost:8000", {
      withCredentials: true,
    });

    socket.emit('joinRoom', { userId });

   
    socket.on('receiveMessage', (message) => {
      setChats((prevChats) => [...prevChats, message]);
    });

    return () => {
      socket.disconnect(); 
    };
  }, [userId]);

  const getChats = async()=>{
    try {
        const token = localStorage.getItem("accessToken")
        if(!token){
            console.error("No token found")
            return
        }
       
       
        
        const response = await fetch(`http://localhost:8000/api/v1/message/${user.user._id}`,{
            method: "GET",
            headers:{
                Authorization: `Bearer${token}`,
                "Content-Type": "application/json"
            }
           
        })
        if(response.ok){
           const chats = await response.json()
           setChats(chats.data)
        }else{
            console.error("fetching chats failed", response.statusText)
        }
    } catch (error) {
        console.error("Something went wrong while fetching messages", error)
    }
}

  useEffect(() => {
    getChats(); 
  }, []);

  return (
    <div className="flex flex-col p-4 w-full mx-auto space-y-4 scrollbar-hide overflow-y-auto bg-[#201f1f] text-[#E0E0E0] pb-[6.5rem] md:pb-14 h-[96dvh] md:h-dvh">
      {Chats.map((chat,index) => (
        <div
          key={index}
          className={`p-3 rounded-lg max-w-[70%] ${
            chat.owner === userId
              ? "ml-auto bg-[#33CBFE] text-white text-right"
              : "mr-auto bg-[#494949] text-left"
          }`}
        >
          <p>{chat.content}</p>
        </div>
      ))}
      <div className="fixed bottom-[4.2rem] md:bottom-1  min-[1138px]:w-[83%] min-[766px]:w-[76%] w-[94%]">
        <SendMessage user={user} />
      </div>
    </div>
  );
}

export default Chats;
