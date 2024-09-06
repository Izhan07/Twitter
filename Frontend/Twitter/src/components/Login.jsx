import React, {useState} from "react"
import {useNavigate, Link} from "react-router-dom"
import {useDispatch} from "react-redux"
import {useForm} from "react-hook-form"
import {login as authlogin} from "../store/auth.js"
import Input from "./Input.jsx"
import "./components.css"

 function Login (){
    const dispatch = useDispatch()
    const {handleSubmit, register} = useForm() 
   
    
    const login = async(data)=>{
       try {
        const session = await fetch(`http://localhost:8000/api/v1/users/login`,{
         method: "POST",
         headers: {
             "Content-Type": "application/json",
         },
         body: JSON.stringify(data)
        })
       if(session.ok){
        const responseData = await session.json()
        const accesstoken = responseData.data.accessToken
        
        localStorage.setItem("accessToken", accesstoken)
        dispatch(authlogin(responseData))
        console.log(responseData)
       }else{
        console.error('Login failed with status:', response.status);
       }
        
       } catch (error) {
        console.error("Login error", error)
       }
    }
    return(
        <>
        <form className="login" onSubmit={handleSubmit(login)}>
            <Input
            label = "Email"
            placeholder = "enter your email"
            type = "email"
            {...register("email",{
                required: true,
                validate:{
                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                }
            })}

            />
            <Input
            label = "username"
            placeholder = "enter username"
            type = "text"
            {...register("username", {
                required: true
            })}
            />
            <Input
            label = "Password"
            placeholder = "enter your password"
            type = "password"
            {...register("password", {
                required: true
            })}
            />
            <button type="submit"> Login</button>
            
              
        </form>
        </>
    )
}
export default Login;