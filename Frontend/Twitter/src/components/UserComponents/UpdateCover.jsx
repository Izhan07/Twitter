import React from "react";
import { useForm } from "react-hook-form";
import Input from "../Input";
import logo from "../../img/twitter.png";
import { useNavigate } from "react-router-dom";

function UpdateCover() {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate()
  const CoverUpdate = async (data) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      const formData = new FormData();
      if (data.coverimage[0]) {
        formData.append("coverimage", data.coverimage[0]);
      }

      const response = await fetch(
        `http://localhost:8000/api/v1/users/CoverUpdate`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer${token}`,
          },
          body: formData,
        }
      );
      if (response.ok) {
        const cover = await response.json();
        navigate("/")
      } else {
        console.error("Cover update failed", response.statusText);
      }
    } catch (error) {
      console.error("Something went wrong while updating cover", error);
    }
  };

  return (
    <>
      <div className="h-dvh w-full flex items-center justify-center bg-[#494949] p-2">
        <form
          className="h-96 w-96 flex flex-col bg-[#201f1f] text-[#E0E0E0] shadow-slate-950 shadow-2xl rounded-xl "
          onSubmit={handleSubmit(CoverUpdate)}
        >
          <div className="w-full flex flex-col items-center justify-center">
            <img className="w-40 h-20 object-cover" src={logo} />
            <h1 className="font-semibold text-xl">Update Cover</h1>
          </div>

          <div className="flex flex-col  items-center justify-between h-full pt-4 w-full mt-6 py-2 ">
            <Input
              className="file:bg-gradient-to-b file:from-blue-500 file:to-blue-600 file:px-6 file:py-3 file:m-5 file:border-none file:rounded-full file:text-white file:cursor-pointer fil:shadow-lg file:shadow-blue-600/50 bg-gradient-to-br from-gray-600 to-gray-700  text-white/80 rounded-full  "
              placeholder="upload you CoverImage"
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              {...register("coverimage", {
                required: true,
              })}
            />
            <div className="w-full flex items-center justify-center  my-2 py-2 ">
              <button
                className="bg-[#33CBFE] text-white px-3 py-2 w-44 rounded-2xl"
                type="submit"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default UpdateCover;
