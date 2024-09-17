// "use client";

import { doSignOut } from "@/actions/auth";
// import { useRef } from "react";
import { IoLogOutOutline } from "react-icons/io5";

const LogOutComponent = () => {
  // const formRef = useRef<HTMLFormElement>(null);
  // const handleLogOut = () => {
  //   localStorage.removeItem("selected smartsite");

  //   // Trigger the form submission
  //   if (formRef.current) {
  //     formRef.current.submit();
  //   }
  // };
  return (
    <div>
      <form action={doSignOut}>
        {/* <form ref={formRef} action={doSignOut}> */}
        {/* <div> */}
        <button
          type="submit"
          // onClick={handleLogOut}
          className={`flex items-center justify-center gap-1 mt-6 pb-6 pl-4 font-medium text-[#424651]`}
        >
          <IoLogOutOutline size={18} />
          Logout
        </button>
        {/* </div> */}
      </form>
    </div>
  );
};

export default LogOutComponent;
