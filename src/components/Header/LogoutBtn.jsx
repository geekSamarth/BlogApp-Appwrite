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
        toast.success("User logged out successfully !!");
      })
      .catch((error) => {
        console.error("Failed in logging out the user", error);
        toast.error(error.message);
      });
  };
  return (
    <button
      className="inline-block px-2 md:px-4 py-1.5 md:ml-5 duration-200 rounded-xl bg-fuchsia-700 text-white hover:bg-fuchsia-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-600 focus:ring-opacity-50 text-[15px] md:text-base"
      onClick={() => logoutHandler()}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
