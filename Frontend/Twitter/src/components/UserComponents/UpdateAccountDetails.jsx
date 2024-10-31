import React from "react";
import { useForm } from "react-hook-form";
import Input from "../Input";
import logo from "../../img/twitter.png"
import { useNavigate } from "react-router-dom";

function UpdateAccountDetails() {

  const { handleSubmit, register } = useForm();
  const navigate = useNavigate()

  const updateDetails = async (data) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      const response = await fetch(
        `http://localhost:8000/api/v1/users/details`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        const details = await response.json();
        navigate("/")
      } else {
        console.error("Update account details failed", response.statusText);
      }
    } catch (error) {
      console.error("Something went wrong while updating accunt deatils");
    }
  };
  return (
    <>
    <div className="h-dvh w-full flex items-center justify-center bg-[#494949] p-2">
      <form className="h-96 w-96  flex-col px-2  bg-[#201f1f] text-[#E0E0E0] shadow-slate-950 shadow-2xl rounded-xl " onSubmit={handleSubmit(updateDetails)}>
      <div className="w-full flex items-center justify-center">
                <img className="w-40 h-20 object-cover" src={logo}/>
            </div>
      <div className="flex flex-col justify-between h-[70%]">     
       <div className="w-full">
       <Input
          className="flex flex-col w-full my-2 px-2 py-2 rounded-lg bg-[#494949]"
          labelClass="font-semibold"
          label="Email"
          placeholder="Enter your email"
          type="email"
          {...register("email", {
            required: false,
            validate: {
              matchPattern: (value) =>
                value === "" ||
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        />
       </div>

       <div className="w-full">
       <Input
           className="flex flex-col w-full my-2 px-2 py-2 rounded-lg bg-[#494949]"
           labelClass="font-semibold"
          label="fullname"
          placeholder="Enter new fullname"
          type="text"
          {...register("fullname", {
            required: false,
          })}
        />
       </div>
       
         <div className="w-full flex items-center justify-center">
         <button  className="bg-[#33CBFE] text-white px-3 py-2 w-44 rounded-2xl" type="submit">Update</button>
         </div>
         </div> 
      </form>
      </div>
    </>
  );
}
export default UpdateAccountDetails;
