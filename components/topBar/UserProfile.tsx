import { auth } from "@/auth";
import Image from "next/image";
import React from "react";
import { FaAngleDown } from "react-icons/fa";
import travis from "../../public/travis-image.svg";
import SignOut from "./SignOut";

const UserProfile = async () => {
  const session = await auth();

  return (
    <div>
      <div className="bg-gray-100 py-2 px-3 flex items-center gap-2 rounded-full relative">
        {session?.user ? (
          <Image
            src={session?.user?.image as any}
            width={30}
            height={30}
            alt="travis image"
            className="rounded-full"
          />
        ) : (
          <Image src={travis} width={30} alt="travis image" />
        )}

        <p className="text-sm">
          {session?.user ? session?.user?.name : "Travis Herron"}{" "}
        </p>
        {session?.user && <SignOut />}
      </div>
    </div>
  );
};

export default UserProfile;
