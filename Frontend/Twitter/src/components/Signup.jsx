import React from "react";
import Input from "./Input.jsx";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login as authlogin } from "../store/auth.js";

function Signup(){
    const {handleSubmit, register} = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const signup = async(data)=>{
       try {
         const response = await fetch(`http://localhost:8000/api/v1/users/register`, {
             method: "POST",
             headers: {
                 "Content-Type" : "application/json",
             },
             body: JSON.stringify(data)
         })
         if(response.ok){
            const userData = await response.json()
            dispatch(authlogin(userData))
            console.log(userData)
 
         }else{
            console.error("Signup failed error message:", response.message)
         }
       } catch (error) {
        console.error("Signup failed", error)
       }
    }

    return(
        <>
        <form onSubmit={handleSubmit(signup)}>
            <Input
            label = "Avatar"
            placeholder = "upload you avatar"
            type = "file"
            accept = "image/png, image/jpg, image/jpeg"
            {...register("avatar",{
                required: true
            })}
            />
              <Input
            label = "CoverImage"
            placeholder = "upload you CoverImage"
            type = "file"
            accept = "image/png, image/jpg, image/jpeg"
            {...register("coverimage",{
                required: false
            })}
            
            />
            <Input
            label = "Username"
            placeholder = "Enter unique username"
            type = "text"
            {...register("username", {
                required: true
            })}
            />
             <Input
            label = "Email"
            placeholder = "Enter your email"
            type = "email"
            {...register("email", {
                required: true,
                validate:{
                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                }
            })}
            />
              <Input
            label = "Password"
            placeholder = "Enter your password"
            type = "password"
            {...register("password", {
                required: true
            })}
            />
            <button 
            type="submit"
            >Signup</button>
            <h3>Already have an account?</h3> <Link>
            <button>Login</button>
            </Link>

        </form>
        </>
    )
}
export default Signup;
