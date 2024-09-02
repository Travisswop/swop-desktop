"use client";

import { doSignOut } from "@/actions/auth";
import { useRef } from "react";
import { IoLogOutOutline } from "react-icons/io5";

const LogOutComponent = ({ toggle }: { toggle: boolean }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const handleLogOut = () => {
    localStorage.removeItem("selected smartsite");

    // Trigger the form submission
    if (formRef.current) {
      formRef.current.submit();
    }
  };
  return (
    <form ref={formRef} action={doSignOut}>
      <button
        type="submit"
        onClick={handleLogOut}
        className={`flex items-center justify-center gap-1 mt-6 pb-6 ${
          !toggle ? "pl-4" : "px-2"
        } font-medium text-[#424651]`}
      >
        <IoLogOutOutline size={18} />
        {!toggle && "Logout"}
      </button>
    </form>
  );
};

export default LogOutComponent;
