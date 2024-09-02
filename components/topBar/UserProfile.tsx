"use client";
import Image from "next/image";
import React, { useRef } from "react";
import travis from "../../public/travis-image.svg";
import isUrl from "@/util/isUrl";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { doSignOut } from "@/actions/auth";
import { IoLogOutOutline } from "react-icons/io5";
import Link from "next/link";

const UserProfile = ({ session }: any) => {
  const formRef = useRef<HTMLFormElement>(null);

  // const session = await auth();

  const imageSrc = isUrl(session?.picture)
    ? session?.picture
    : `/images/user_avator/${session?.picture}.png`;

  // console.log("image src formm user profile", imageSrc);

  const handleLogOut = () => {
    localStorage.removeItem("selected smartsite");
    // Trigger the form submission
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  return (
    <div>
      {/* <div className="bg-gray-100 py-2 px-3 flex items-center gap-2 rounded-full cursor-pointer">
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
      </div> */}
      {/* {session?.user && <SignOut />} */}

      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="solid"
            className="bg-gray-200 px-3 flex items-center gap-2 rounded-full"
          >
            {session.picture ? (
              <Image
                src={imageSrc as any}
                width={60}
                height={60}
                alt={"User Profile"}
                className="rounded-full border-2 border-white w-[30px] h-[30px]"
              />
            ) : (
              <Image src={travis} width={30} alt="default image" />
            )}

            <p className="text-sm">
              {session ? session?.name : "Travis Herron"}{" "}
            </p>
            {/* {session?.user && <SignOut />} */}
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" className="p-2 rounded">
          <DropdownItem key="changeSmartsite" className="bg-gray-200 mb-2">
            <Link href={"/select-smartsite"}>Change Smartsite</Link>
          </DropdownItem>
          {/* <DropdownItem key="copy">Copy link</DropdownItem>
          <DropdownItem key="edit">Edit file</DropdownItem> */}
          <DropdownItem
            key="delete"
            className="text-white bg-danger-400"
            color="danger"
          >
            <form ref={formRef} action={doSignOut}>
              <button
                type="submit"
                onClick={handleLogOut}
                className={`flex items-center justify-center gap-1 font-medium`}
              >
                <IoLogOutOutline size={18} />
                Logout
              </button>
            </form>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {/* <UserProfileDropdown /> */}
    </div>
  );
};

export default UserProfile;
