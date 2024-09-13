import React from "react";
import { useForm } from "react-hook-form";
import Input from "../Input";

function UpdateAvatar(){
    const {handleSubmit, register} = useForm()
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
           
            const response = await fetch(`http://localhost:8000/api/v1/users/AvatarUpdate`, {
                method: "PATCH",
                headers:{
                    Authorization: `Bearer${token}`
                },
                body: formData

            })
            if(response.ok){
                const cover = await response.json()
                console.log(cover)
            }else{
                console.error("Avatar update failed", response.statusText)
            }
        } catch (error) {
            console.error("Something went wrong while updating avatar", error)
        }
    }

    return(
        <>
        <form onSubmit={handleSubmit(AvatarUpdate)}>
        <Input
            label = "Avatar"
            placeholder = "upload you Avatar"
            type = "file"
            accept = "image/png, image/jpg, image/jpeg"
            {...register("avatar",{
                required: true
            })}
            
            />
            <button type="submit">Update</button>
        </form>
        </>
    )
}
export default UpdateAvatar;