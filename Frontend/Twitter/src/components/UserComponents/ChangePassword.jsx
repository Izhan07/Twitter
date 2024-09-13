import React from "react";
import Input from "../Input";
import { useForm } from "react-hook-form";

function ChangePassword(){
    const {handleSubmit, register} = useForm()
    const passwordUpadte = async(data)=>{
        try {
            const token = localStorage.getItem("accessToken")
            if(!token){
                console.error("No token found in localStorage")
                return;
            }
            const response = await fetch(`http://localhost:8000/api/v1/users/changePassword`,{
                method: "PATCH",
                headers:{
                    Authorization: `Bearer${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if(response.ok){
                const updatedPassword = await response.json()
                console.log(updatedPassword)
            }else{
                console.error("Password update failed", response.statusText)
            }
        } catch (error) {
            console.error("Somethingwent wrog while changing password", error)
        }
    }
    return(
        <>
        <form onSubmit={handleSubmit(passwordUpadte)}>
            <Input
            label = "Old Password"
            type = "password"
            placeholder = "enter old password"
            {...register("oldPassword",{
                required: true
            })}
            />
              <Input
            label = "new Password"
            type = "password"
            placeholder = "enter new password"
            {...register("newPassword",{
                required: true
            })}
            />
            <button type="submit">Submit</button>
        </form>
        </>
    )
}
export default ChangePassword;