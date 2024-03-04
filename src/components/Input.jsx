import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const InputId = useId();
  return (
    <div className="w-full my-2.5">
      {label && (
        <label
          className="inline-block
             mb-1 pl-1 font-medium text-lg"
          htmlFor={InputId}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-5 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        {...props}
        id={InputId}
      />
    </div>
  );
});

export default Input;
