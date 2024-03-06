import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "../components/index.js";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const response = await authService.getCurrentUser();
        if (response) {
          dispatch(authLogin(response));
          toast.success("User Logged In Successfully!")
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message)
    }
  };
  return (
    <div className="w-full flex justify-center items-center mx-2 pt-20">
      <div
        className={`mx-auto w-full max-w-md bg-[hsl(240,9%,17%)] text-white/80 rounded-xl py-10 px-7 md:py-10 md:px-7 border-[1px] border-white/20`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-white/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline text-white/90"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500 text-center mt-8">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
             
              {...register("password", {
                required: true,
              })}
            />
            <div className="flex justify-end items-center">
            
            </div>
            <Link to={"/forget-password"} className="underline duration-200 transition-all font-medium flex justify-end mb-5 text-red-500 hover:text-red-400">
              <span className="">Forget Password?</span>
            </Link>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default Login;
