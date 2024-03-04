import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { Button, Input, Logo } from "../components";

const ResetPassword = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
	const secret = urlParams.get("secret");
	const userId = urlParams.get("userId");
 
  
  const resetPassword = async (data) => {
    try {
      const result = await authService.resetPassword(userId,secret,data.newPassword,data.confirmPassword);
      // console.log(result);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center pt-20">
      <div
        className={`mx-auto w-full max-w-lg bg-[hsl(240,9%,17%)] text-white/80 rounded-xl py-10 px-7 md:py-10 md:px-7 border-[1px] border-white/20   z-10`}
      >
        <div className="mb-3 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight my-5">
          Reset Password for your account
        </h2>
        {error && <p className="text-red-500 mt-4 mb-2 text-center">{error}</p>}
        <form onSubmit={handleSubmit(resetPassword)}>
          <div className="flex flex-col gap-2">
            <Input
              label="New Password"
              type="password"
              placeholder="Enter your new password"
              {...register("newPassword", {
                required: true,
              })}
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: true,
              })}
            />

            <Button type="submit" className={`w-full mt-5`}>
              Reset Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
