"use client";
import { doSignOut } from "@/actions/auth";
import { FaAngleDown } from "react-icons/fa";

const SignOut = () => {
  return (
    <div className="group">
      <FaAngleDown size={14} />
      <form
        action={doSignOut}
        className="absolute top-7 right-0 hidden group-hover:block"
      >
        <button
          type="submit"
          className="bg-gray-100 px-4 rounded-br-xl pt-4 pb-1"
        >
          Logout
        </button>
      </form>
    </div>
  );
};

export default SignOut;
