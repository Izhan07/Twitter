import React from "react";
import Input from "../Input.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login as authlogin } from "../../store/auth.js";
import logo from "../../img/twitter.png"

function Signup(){
    const {handleSubmit, register} = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const signup = async(data)=>{
       try {
        const formData = new FormData()
        formData.append("avatar", data.avatar[0]) 
        formData.append("username", data.username )
        formData.append("email", data.email)
        formData.append("password", data.password)
        formData.append("fullname", data.fullname)
        if(data.coverimage){
          formData.append("coverimage", data.coverimage[0])
        }
         const response = await fetch(`https://twitter-kbki.onrender.com/api/v1/users/register`, {
             method: "POST",
           
             body: formData
         })
         if(response.ok){
            const userData = await response.json()
            localStorage.setItem("accessToken",userData.data.accessToken.accessToken)
            localStorage.setItem("userId",userData.data.createdUser._id)
            localStorage.setItem("username",userData.data.createdUser.username)
            dispatch(authlogin(userData))
            console.log(userData)
            navigate("/")
         }else{
            console.error("Signup failed error message:", response.message)
         }
       } catch (error) {
        console.error("Signup failed", error)
       }
    }

    return(
        <>
        <form className="flex flex-col h-full w-full  gap-4 items-center  overflow-y-auto pb-2 bg-[#494949]" onSubmit={handleSubmit(signup)}>
        <div>
           <img className="h-20 w-36" src={logo}/>
           </div>
       <div className="flex min-[1205px]:flex-row flex-col border-2 justify-evenly min-[1205px]:p-6 py-6 px-2 rounded-2xl min-[414px]:w-3/4 w-[95%] border-[#33CBFE]   bg-[#201f1f] text-[#E0E0E0] shadow-slate-950 shadow-2xl max-[1205px]:gap-3 ">
       <div  className="  flex items-center max-[1205px]:justify-between max-[1205px]:w-full min-[638px]:flex-row flex-col">
        <Input
            label = "Avatar:"
            labelClass= "font-sans font-bold text-2xl "
            placeholder = "upload you avatar"
            className="file:bg-gradient-to-b file:from-blue-500 file:to-blue-600 file:px-6 file:py-3 file:m-5 file:border-none file:rounded-full file:text-white file:cursor-pointer fil:shadow-lg file:shadow-blue-600/50 bg-gradient-to-br from-gray-600 to-gray-700  text-white/80 rounded-full min-[638px]:ml-7 "
            type = "file"
            accept = "image/png, image/jpg, image/jpeg"
            {...register("avatar",{
                required: true
            })}
            />
        </div>
          <div className="  flex items-center  max-[1205px]:justify-between max-[1205px]:w-full min-[638px]:flex-row flex-col ">
          <Input
            label = "CoverImage:"
            placeholder = "upload you CoverImage"
             labelClass= "font-sans font-bold text-2xl "
             className="file:bg-gradient-to-b file:from-blue-500 file:to-blue-600 file:px-6 file:py-3 file:m-5 file:border-none file:rounded-full file:text-white file:cursor-pointer fil:shadow-lg file:shadow-blue-600/50 bg-gradient-to-br from-gray-600 to-gray-700  text-white/80 rounded-full min-[638px]:ml-7 "
            type = "file"
            accept = "image/png, image/jpg, image/jpeg"
            {...register("coverimage",{
                required: false
            })}
            
            />
       </div>

         
          </div>
        <div className="flex border-2 justify-evenly p-6 rounded-2xl min-[414px]:w-3/4 w-[95%] border-[#33CBFE]   bg-[#201f1f] text-[#E0E0E0] shadow-slate-950 shadow-2xl min-[1205px]:flex-row flex-col max-[1205px]:gap-3">
        <div className="w-1/3  flex items-center   max-[1205px]:justify-between max-[1205px]:w-full min-[638px]:flex-row flex-col">
           <Input
            label = "Username:"
            labelClass= "font-sans font-bold text-2xl "
            className="h-8 px-4 py-5 rounded-2xl min-[638px]:ml-7 text-black"
            placeholder = "Enter unique username"
            type = "text"
            {...register("username", {
                required: true
            })}
            />
           </div>
          <div className="w-1/3  flex items-center max-[1205px]:justify-between max-[1205px]:w-full min-[638px]:flex-row flex-col">
          <Input
            label = "FullName:"
            placeholder = "Enter your fullname"
            labelClass = "font-sans font-bold text-2xl "
            className = "h-8 px-4 py-5 rounded-2xl min-[638px]:ml-7 text-black"
            type = "text"
            {...register("fullname", {
              required: true
            })}
            />
          </div>
        </div>
           <div className="flex border-2 justify-evenly p-6 rounded-2xl min-[414px]:w-3/4 w-[95%] border-[#33CBFE]   bg-[#201f1f] text-[#E0E0E0] shadow-slate-950 shadow-2xl min-[1205px]:flex-row flex-col max-[1205px]:gap-3">
          <div className="w-1/3  flex items-center   max-[1205px]:justify-between max-[1205px]:w-full min-[638px]:flex-row flex-col ">
          <Input
            label = "Email:"
            labelClass= "font-sans font-bold text-2xl "
             className="h-8 px-4 py-5 rounded-2xl min-[638px]:ml-7 text-black"
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
         
          </div>
          <div className="w-1/3  flex items-center   max-[1205px]:justify-between max-[1205px]:w-full min-[638px]:flex-row flex-col">
          <Input
            label = "Password:"
            placeholder = "Enter your password"
             labelClass= "font-sans font-bold text-2xl "
             className="h-8 px-4 py-5 rounded-2xl min-[638px]:ml-7 text-black "
            type = "password"
            {...register("password", {
                required: true
            })}
            />
          
          </div>
           </div>
          <div  className="flex border-2 flex-col justify-center items-center p-6 rounded-2xl min-[414px]:w-3/4 w-[95%] border-[#33CBFE]  bg-[#201f1f] text-[#E0E0E0] shadow-slate-950 shadow-2xl">
          <button className="bg-[#33CBFE] p-3 w-32 rounded-2xl text-white m-3"
            type="submit"
            >Signup</button>
            <h3>Already have an account?</h3> <Link to="/login">
            <button className="text-[#33CBFE]">Login</button>
            </Link>

          </div>
        </form>
        </>
    )
}
export default Signup;
