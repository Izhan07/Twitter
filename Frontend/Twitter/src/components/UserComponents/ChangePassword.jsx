import React from "react";
import Input from "../Input";
import { useForm } from "react-hook-form";
import logo from "../../img/twitter.png"
import { useNavigate } from "react-router-dom";

function ChangePassword(){
    const {handleSubmit, register} = useForm()
    const navigate = useNavigate()
    const passwordUpadte = async(data)=>{
        try {
            const token = localStorage.getItem("accessToken")
            if(!token){
                console.error("No token found in localStorage")
                return;
            }
            const response = await fetch(`https://twitter-kbki.onrender.com/api/v1/users/changePassword`,{
                method: "PATCH",
                headers:{
                    Authorization: `Bearer${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if(response.ok){
                const updatedPassword = await response.json()
                navigate("/")
            }else{
                console.error("Password update failed", response.statusText)
            }
        } catch (error) {
            console.error("Somethingwent wrog while changing password", error)
        }
    }
    return(
        <>
        <div className="h-dvh w-full flex items-center justify-center bg-[#494949] p-2">
        <form className="h-96 w-96  flex-col px-2  bg-[#201f1f] text-[#E0E0E0] shadow-slate-950 shadow-2xl rounded-xl " onSubmit={handleSubmit(passwordUpadte)}>
            <div className="w-full flex items-center justify-center">
                <img className="w-40 h-20 object-cover" src={logo}/>
            </div>
           <div className="flex flex-col justify-between h-[70%]">
            <div className="w-full">
            <Input
            className="flex flex-col w-full my-2 px-2 py-2 rounded-lg bg-[#494949]"
            labelClass="font-semibold"
            label = "Old Password"
            type = "password"
            placeholder = "enter old password"
            {...register("oldPassword",{
                required: true
            })}
            />
            </div>
           <div className="w-full">
           <Input
            className="flex flex-col w-full my-2 px-2 py-2 rounded-lg bg-[#494949]"
             labelClass="font-semibold"
            label = "New Password"
            type = "password"
            placeholder = "enter new password"
            {...register("newPassword",{
                required: true
            })}
            />
           </div>
        <div className="w-full flex items-center justify-center">
          <button className="bg-[#33CBFE] text-white px-3 py-2 w-44 rounded-2xl" type="submit">Submit</button>
        </div>
        </div>
        </form>
        </div>
        </>
    )
}
export default ChangePassword;