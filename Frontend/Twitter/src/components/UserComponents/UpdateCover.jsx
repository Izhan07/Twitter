import React from "react";
import { useForm } from "react-hook-form";
import Input from "../Input";

function UpdateCover(){
    const {handleSubmit, register} = useForm()
    const CoverUpdate = async (data)=>{
        try {
            const token = localStorage.getItem("accessToken")
            if(!token){
                console.error("No token found in localStorage")
                return;
            }
            const formData = new FormData()
             if(data.coverimage[0]){
                formData.append("coverimage", data.coverimage[0])
             }
           
            const response = await fetch(`http://localhost:8000/api/v1/users/CoverUpdate`, {
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
                console.error("Cover update failed", response.statusText)
            }
        } catch (error) {
            console.error("Something went wrong while updating cover", error)
        }
    }

    return(
        <>
        <form onSubmit={handleSubmit(CoverUpdate)}>
        <Input
            label = "CoverImage"
            placeholder = "upload you CoverImage"
            type = "file"
            accept = "image/png, image/jpg, image/jpeg"
            {...register("coverimage",{
                required: true
            })}
            
            />
            <button type="submit">Update</button>
        </form>
        </>
    )
}
export default UpdateCover;