import React, {useState} from "react";


function DeleteTweet({tweet}){


    const delTweet = async()=>{
        try {
            const token = localStorage.getItem("accessToken")
            if(!token){
                console.error("No token found in localStorage")
            }
            const response = await fetch(`http://localhost:8000/api/v1/tweets/del/${tweet._id}`,{
                method: "DELETE",
                headers:{
                    Authorization: `Bearer${token}`
                }
            })
            if(response.ok){
                console.log("Tweet deleted")
            }else{
                console.error("Tweet deletation failed")
            }
        } catch (error) {
            console.error("Something went wrong while deleting tweet", error)
        }

    }

    return(
        <>
        <button onClick={delTweet}>Delete</button>
        </>
    )
}
export default DeleteTweet;