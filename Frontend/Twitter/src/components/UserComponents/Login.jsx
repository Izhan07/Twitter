import React, {useState} from "react"
import {useNavigate, Link} from "react-router-dom"
import {useDispatch} from "react-redux"
import {useForm} from "react-hook-form"
import {login as authLogin} from "../../store/auth"
import Input from "../Input.jsx"
import logo from "../../img/twitter.png"


 function Login (){
    const dispatch = useDispatch()
    const {handleSubmit, register} = useForm() 
    const [error, setError] = useState("")
   const navigate = useNavigate()
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
        const userData = await session.json()
        const accesstoken = userData.data.accessToken
        
        localStorage.setItem("accessToken", accesstoken)
        
        localStorage.setItem("userId",userData.data.user._id)
        localStorage.setItem("username",userData.data.user.username)
        dispatch(authLogin())
       navigate("/")
          
       }else{
        console.error('Login failed with status:', session.message);
        setError("Invalid User Credentials")
       }
        
       } catch (error) {
        console.error("Login error", error)
       }
    }
    return(
        <>
        <form className="border-2 border-[#33CBFE] h-96 w-96 flex items-center  flex-col justify-evenly rounded-2xl bg-[#201f1f] text-[#E0E0E0] shadow-slate-950 shadow-2xl" onSubmit={handleSubmit(login)}>
           <div>
           <img className="h-20 w-36" src={logo}/>
           </div>
          <div className="w-full  p-2 flex items-center justify-between" >
          <Input
            className = "ml-3 w-[77%] outline-none autofill:bg-white text-black h-8 rounded-xl p-2 "
            label = "Email:"
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
          </div>
          <div className="w-full  p-2 flex items-center justify-between">
          <Input
            className = "ml-3 w-[77%] outline-none autofill:bg-white text-black h-8 rounded-xl p-2 "
            label = "Username:"
            placeholder = "enter username"
            type = "text"
            {...register("username", {
                required: true
            })}
            />
          </div>
           <div className="w-full  p-2 flex items-center justify-between">
           <Input
            className = "ml-3 w-[77%] outline-none autofill:bg-white text-black h-8 rounded-xl p-2 "
            label = "Password:"
            placeholder = "enter your password"
            type = "password"
            {...register("password", {
                required: true
            })}
            />
           </div>
          <div>
          <button className="bg-[#33CBFE] text-white w-20 rounded-xl h-8" type="submit"> Login</button>
          </div>
          {
            error? <div><p className="text-red-700">
                {error}
                </p> </div> : null
          }
            <div>
                <Link className="text-[#33CBFE] font-semibold" to="/signup">
                Signup
                </Link>
            </div>
              
        </form>
        </>
    )
}
export default Login;