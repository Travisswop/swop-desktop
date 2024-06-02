import { auth } from "@/auth";
import Image from "next/image";
import React from "react";
import travis from "../../public/travis-image.svg";
// import SignOut from "./SignOut";

function isUrl(str: any) {
  try {
    new URL(str);
    return true;
  } catch (_) {
    return false;
  }
}

const UserProfile = async () => {
  const session = await auth();

  const imageSrc = isUrl(session?.user?.image)
    ? session?.user?.image
    : `/images/user_avator/${session?.user?.image}.png`;

  return (
    <div>
      <div className="bg-gray-100 py-2 px-3 flex items-center gap-2 rounded-full relative">
        {session?.user?.image ? (
          <Image
            src={imageSrc as any}
            width={60}
            height={60}
            alt={session?.user?.image || "User Profile"}
            className="rounded-full border-4 border-white w-[30px] h-[30px]"
          />
        ) : (
          <Image src={travis} width={30} alt="default image" />
        )}

        <p className="text-sm">
          {session?.user ? session?.user?.name : "Travis Herron"}{" "}
        </p>
        {/* {session?.user && <SignOut />} */}
      </div>
    </div>
  );
};

export default UserProfile;
