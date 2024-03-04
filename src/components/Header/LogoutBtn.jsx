import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import toast from "react-hot-toast";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
        toast.success("User logged out successfully !!")
      })
      .catch((error) => {
        console.error("Failed in logging out the user",error);
        toast.error(error.message);
      });
  };
  return (
    <button
      className="inline-block px-6 py-1.5 duration-200 hover:bg-blue-100 hover:text-black rounded-xl"
      onClick={() => logoutHandler()}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
