import React, { useId } from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const selectId = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={selectId} className="pl-1 font-medium">{label}</label>}
      <select
        {...props}
        id={selectId}
        ref={ref}
        className={`${className} px-3 py-2 mt-0.5  rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full `}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
