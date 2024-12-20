import React from "react";
import { useForm } from "react-hook-form";
import Input from "../Input";
import logo from "../../img/twitter.png"
import { useNavigate } from "react-router-dom";

function UpdateAvatar(){
    const {handleSubmit, register} = useForm()
    const navigate = useNavigate()
    const AvatarUpdate = async (data)=>{
        try {
            const token = localStorage.getItem("accessToken")
            if(!token){
                console.error("No token found in localStorage")
                return;
            }
            const formData = new FormData()
             if(data.avatar[0]){
                formData.append("avatar", data.avatar[0])
             }
           
            const response = await fetch(`https://twitter-kbki.onrender.com/api/v1/users/AvatarUpdate`, {
                method: "PATCH",
                headers:{
                    Authorization: `Bearer${token}`
                },
                body: formData

            })
            if(response.ok){
                const cover = await response.json()
                navigate("/")
            }else{
                console.error("Avatar update failed", response.statusText)
            }
        } catch (error) {
            console.error("Something went wrong while updating avatar", error)
        }
    }

    return(
        <>
        <div className="h-dvh w-full flex items-center justify-center bg-[#494949] p-2">
        <form className="h-96 w-96 flex flex-col bg-[#201f1f] text-[#E0E0E0] shadow-slate-950 shadow-2xl rounded-xl " onSubmit={handleSubmit(AvatarUpdate)}>
            <div className="w-full flex flex-col items-center justify-center">
                <img className="w-40 h-20 object-cover" src={logo}/>
                <h1 className="font-semibold text-xl">
                    Update Avatar
                </h1>
            </div>
          
        <div className="flex flex-col  items-center justify-between h-full pt-4 w-full mt-6 py-2 ">
        <Input
            className="file:bg-gradient-to-b file:from-blue-500 file:to-blue-600 file:px-6 file:py-3 file:m-5 file:border-none file:rounded-full file:text-white file:cursor-pointer fil:shadow-lg file:shadow-blue-600/50 bg-gradient-to-br from-gray-600 to-gray-700  text-white/80 rounded-full  "
            placeholder = "upload you Avatar"
            type = "file"
            accept = "image/png, image/jpg, image/jpeg"
            {...register("avatar",{
                required: true
            })}
            
            />
             <div className="w-full flex items-center justify-center  my-2 py-2 ">
           <button className="bg-[#33CBFE] text-white px-3 py-2 w-44 rounded-2xl" type="submit">Update</button>
           </div>
        </div>
          
        </form>
        </div>
        </>
    )
}
export default UpdateAvatar;