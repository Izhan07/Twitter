import React from "react";


function ProfileCont({user}){

    return(
        <>
        <div className="px-2 py-1 flex items-center gap-4 h-24 w-full  bg-[#858484] hover:bg-opacity-50 rounded-3xl my-2">
            <div className="h-12 w-12 ">
              <img className="h-12 w-12 object-cover rounded-full" src={user.avatar}/>
            </div>
            <div>
                <p className="font-semibold">{user.username}</p>
            </div>
        </div>
        </>
    )
}
export default ProfileCont;