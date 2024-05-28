"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ConfirmPasswordInput = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          name="confirmPassword"
          required
          autoComplete="off"
          placeholder="Enter confirm password"
          className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl bg-white focus:outline-none px-4 py-2 text-gray-700"
        />
        <button type="button" onClick={() => setShow(!show)}>
          {show ? (
            <FaEye
              className="absolute top-1/2 -translate-y-[50%] right-4"
              size={18}
            />
          ) : (
            <FaEyeSlash
              className="absolute top-1/2 -translate-y-[50%] right-4"
              size={18}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default ConfirmPasswordInput;
