import React from "react";
import PostComment from "../CommentComponents/Addcomment.jsx";
import Close from "../../img/cross.png"
function Modal({ isOpen, onClose,children, tweet  }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-black bg-opacity-50 p-2">
      <div className="bg-[#201f1f] text-[#E0E0E0] p-4  shadow-lg w-[32rem] h-[33rem]  max-[536px]:w-[18rem] overflow-y-auto relative scrollbar-hide rounded-t-2xl">
        <button onClick={onClose} className="text-right text-red-500">
          <img className="h-6 w-6 object-cover" src={Close}/>
        </button>
      {children}
      </div>
      <div className="w-[32rem]  max-[536px]:w-[18rem] bg-[#494949] rounded-b-2xl">
        <PostComment tweet={tweet}/>
      </div>
    </div>
  );
}

export default Modal;
