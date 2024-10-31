import React, { useEffect } from "react";
import Input from "./../Input";
import { useForm } from "react-hook-form";
import { io } from "socket.io-client";
import share from "../../img/share.png"
let socket;

function SendMessage({ user }) {
  const { handleSubmit, register } = useForm();

 
  useEffect(() => {
    socket = io("http://localhost:8000", {
      withCredentials: true,
    });

   
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const sendMessage = (data) => {
    if (socket) {
      const ownerId = localStorage.getItem("userId");
      socket.emit("sendMessage", {
        content: data.content,
        reciverId: user.user._id,
        ownerId,
      });
    } else {
      console.error("Socket not connected");
    }
  };

  return (
    <form className=" w-full px-1 py-1 bg-[#494949] text-[#E0E0E0] rounded-2xl flex items-center gap-3 " onSubmit={handleSubmit(sendMessage)}>
      <Input
        className="w-[95%] outline-none px-2 py-2 rounded-2xl bg-[#201f1f] #201f1f"
        type="text"
        {...register("content", { required: true })}
      />
      <button type="submit">
        <img className="h-6 w-6 object-cover " src={share}/>
      </button>
    </form>
  );
}

export default SendMessage;
