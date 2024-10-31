import React from "react";
import close from "../../img/cross.png"
function UpdateModal({isOpen, isClose,children,tweet}){
if(!isOpen) return null;
return(
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-black bg-opacity-50 ">
        <div className=" bg-[#201f1f] text-[#E0E0E0] p-4  shadow-lg w-[32rem] h-[33rem] overflow-y-auto relative scrollbar-hide rounded-2xl max-[536px]:w-[18rem]">
            <button onClick={isClose}>
                <img className="w-6 h-6 object-cover" src={close}/>
            </button>
            {children}
        </div>
    </div>
)
}
export default UpdateModal;