import Image from "next/image";
import React from "react";
import travis from "../../public/travis-image.svg";
import isUrl from "@/util/isUrl";
// import SignOut from "./SignOut";

const UserProfile = async ({ session }: any) => {
  // console.log("session form user profile", session);

  // const session = await auth();

  const imageSrc = isUrl(session?.picture)
    ? session?.picture
    : `/images/user_avator/${session?.picture}.png`;

  // console.log("image src formm user profile", imageSrc);

  return (
    <div>
      <div className="bg-gray-100 py-2 px-3 flex items-center gap-2 rounded-full relative">
        {session.picture ? (
          <Image
            src={imageSrc as any}
            width={60}
            height={60}
            alt={"User Profile"}
            className="rounded-full border-4 border-white w-[30px] h-[30px]"
          />
        ) : (
          <Image src={travis} width={30} alt="default image" />
        )}

        <p className="text-sm">{session ? session?.name : "Travis Herron"} </p>
        {/* {session?.user && <SignOut />} */}
      </div>
    </div>
  );
};

export default UserProfile;
