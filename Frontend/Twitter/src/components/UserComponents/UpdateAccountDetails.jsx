import React from "react";
import {useForm} from "react-hook-form"
import Input from "../Input";

function UpdateAccountDetails(){
    const {handleSubmit, register} = useForm()
    const updateDetails = async(data)=>{
        try {
            const token = localStorage.getItem("accessToken")
            if(!token){
                console.error("No token found in localStorage")
                return;
            }
          const response = await fetch(`http://localhost:8000/api/v1/users/details`,{
            method: "PATCH",
            headers:{
                Authorization: `Bearer${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
          if(response.ok){
            const details = await response.json()
            console.log(details)
          }else{
            console.error("Update account details failed", response.statusText)
          }
        } catch (error) {
            console.error("Something went wrong while updating accunt deatils")
        }

    }
    return(
        <>
        <form onSubmit={handleSubmit(updateDetails)}>
        <Input
  label="Email"
  placeholder="Enter your email"
  type="email"
  {...register("email", {
    required: false,
    validate: {
      matchPattern: (value) =>
        value === "" || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
        "Email address must be a valid address",
    },
  })}
/>

               <Input
            label = "fullname"
            placeholder = "Enter new fullname"
            type = "text"
            {...register("fullname", {
                required: false
            })}
            />
            <button type="submit">Update</button>
        </form>
        </>
    )
}
export default UpdateAccountDetails;