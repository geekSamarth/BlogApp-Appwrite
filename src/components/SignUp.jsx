import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Logo } from "./index.js";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const signup = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      // console.log("user created successfully");
      // console.log(userData)
      if (userData) {
        // const userData = await authService.getCurrentUser();
        // if (userData) dispatch(login(userData));
        // console.log(userData)
        navigate("/login");
        toast.success("User created successfully!! ");
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="w-full flex items-center justify-center pt-20 mx-2">
      <div
        className={`mx-auto w-full max-w-lg bg-[hsl(240,9%,17%)] text-white/80 rounded-xl py-10 px-7 md:py-10 md:px-7 border-[1px] border-white/20   z-10`}
      >
        <div className="mb-3 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight mt-5">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-white/60 tracking-wide mb-5 ">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline text-white/90"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-500 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(signup)}>
          <div className="">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Invalid email address",
                },
              })}
            />
            <Input
              type="password"
              placeholder="Enter your password"
              label="Password: "
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className={`w-full mt-5`}>
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
