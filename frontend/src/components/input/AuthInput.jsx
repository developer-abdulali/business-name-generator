import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const AuthInput = ({ type, label, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label htmlFor="" className="text-[13px] text-slate-800">
        {label}
      </label>

      <div className="input-box">
        <input
          type={
            type == "password" ? (showPassword ? "text" : "password") : "text"
          }
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
          className="w-full bg-transparent outline-none"
        />
        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                onClick={() => toggleShowPassword()}
                className="text-primary cursor-pointer"
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                onClick={() => toggleShowPassword()}
                className="text-slate-400 cursor-pointer"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AuthInput;
