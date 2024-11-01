import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function AuthLayout({ children, authentication = true }) {
    const authStatus = useSelector(state=> state.auth.status)
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  useEffect(()=>{
    if(authentication && authStatus !== authentication){
        navigate("/login")
    }else if(!authentication && authStatus !== authentication){
        navigate("/")
    }setLoader(false)
  },[authStatus,navigate,authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}

export default AuthLayout;
