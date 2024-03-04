import React, { useState } from "react";
import { Input, Button, Logo } from "../components";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";

const ForgetPassword = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const handleForgetPassword = async (data) => {
    setError("");
    try {
      const response = await authService.forgetPassword(data);
      if (response) {
        // console.log(response);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full flex justify-center items-center pt-20">
      <div
        className={`mx-auto w-full max-w-md bg-[hsl(240,9%,17%)] text-white/80 rounded-xl py-10 px-7 md:py-10 md:px-7 border-[1px] border-white/20`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight my-5">
          Forget Password for your account
        </h2>
        {error && <p className="text-red-500 text-center mt-8">{error}</p>}
        <form onSubmit={handleSubmit(handleForgetPassword)}>
          <div className="space-y-6">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  validEmail: (value) => {
                    return (
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ||
                      "Invalid email address"
                    );
                  },
                },
              })}
            />
            <Button type="submit" className="w-full">
              Send Recovery Email
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
