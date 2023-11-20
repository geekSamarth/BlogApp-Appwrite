import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const InputId = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          className="ib
             mb-1 pl-1"
          htmlFor={InputId}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        {...props}
        id={InputId}
      />
    </div>
  );
});

export default Input;
