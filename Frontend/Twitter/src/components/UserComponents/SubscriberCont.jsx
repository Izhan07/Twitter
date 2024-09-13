import React from "react";

function SubscriberCont({subscriber}){

    return(
        <>
        <div>
            <div>
                <img src={subscriber.avatar}/>
            </div>
            <div>
                <h2>
                    {subscriber.username}
                </h2>
            </div>
        </div>
        </>
    )
}
export default SubscriberCont;