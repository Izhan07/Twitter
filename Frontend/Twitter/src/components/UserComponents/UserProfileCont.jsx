import React, {useState} from "react";


function ProfileCont({profile}){
    const [subscibe, setSubscribe] = useState(profile.data.isSubscribed)
   const toggleSubscribe =async ()=>{
    try {
        const token = localStorage.getItem("accessToken")
        if(!token){
            console.error("No token found in localStorage")
            return;
        }
        const response = await fetch(`http://localhost:8000/api/v1/subs/c/${profile.data.username}`, {
            method: "POST",
            headers:{
                Authorization: `Bearer${token}`,
                "Content-Type": "application/json"
            }
        })
        if(response.ok){
            const subs = await response.json()
            setSubscribe(!subscibe)
        }else{
            console.error("Account Subscribe error",response.statusText)
        }
    } catch (error) {
        console.error("Something went wrong while account subscribe", error)
    }
   }
    return(
        <>
        <div>
            <div>
                {
                    profile.data.coverimage? <img src={profile.data.coverimage}/> : <img src="/"/>
                }
            </div>
            <div>
                <img src={profile.data.avatar}/>
            </div>
            <div>{profile.data.fullname}</div>
            <div>{profile.data.username}</div>
            <div>{
                 subscibe? (<button onClick={toggleSubscribe} >Unsubscribe</button>)
                  :
                   (<button onClick={toggleSubscribe}>Subscribe</button>)
                 }</div>
            <div>{profile.data.subscriberCount}</div>

        </div>
        </>
    )
}
export default ProfileCont;