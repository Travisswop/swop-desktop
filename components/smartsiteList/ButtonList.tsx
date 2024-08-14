"use client";
import Link from "next/link";
import React, { useState } from "react";
import AnimateButton from "../Button/AnimateButton";
import Swal from "sweetalert2";
import { MdDelete, MdQrCodeScanner } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { handleDeleteSmartSite } from "@/actions/deleteSmartsite";
import { useRouter } from "next/navigation";

const ButtonList = ({ microsite, token }: any) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();

  const handleDeleteSmartsite = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert your smartsite!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        setDeleteLoading(true);
        const data = await handleDeleteSmartSite(microsite._id, token);
        // console.log("data from delete", data);

        if (data) {
          setDeleteLoading(false);
          await Swal.fire({
            title: "Deleted!",
            text: "Your smartsite has been deleted.",
            icon: "success",
          });
          router.refresh();
        }
        setDeleteLoading(false);
      } catch (error) {
        // Handle error if the delete operation fails
        await Swal.fire({
          title: "Error",
          text: "There was an issue deleting your smartsite. Please try again.",
          icon: "error",
        });
        setDeleteLoading(false);
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      await Swal.fire({
        title: "Cancelled",
        text: "Your smartsite is safe :)",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-1">
      <Link href={`/smartsites/${microsite._id}`} className="text-sm">
        <AnimateButton width="w-[6.5rem]">
          <TbEdit size={18} /> Details
        </AnimateButton>
      </Link>
      <Link href={`/smartsites/icons/${microsite._id}`} className="text-sm">
        <AnimateButton width="w-[5.8rem]">
          <TbEdit size={18} /> Icons
        </AnimateButton>
      </Link>
      <Link href={`/smartsites/qr-code/${microsite._id}`} className="text-sm">
        <AnimateButton width="w-[4.6rem]">
          <MdQrCodeScanner size={18} /> QR
        </AnimateButton>
      </Link>
      <AnimateButton
        isLoading={deleteLoading}
        onClick={handleDeleteSmartsite}
        width="w-[6.2rem]"
        className="text-sm"
      >
        <MdDelete size={18} /> Delete
      </AnimateButton>

      {/* <SecondaryButton>
        <span className="text-sm">Wallet</span>
        <BiWallet size={18} />
      </SecondaryButton> */}
    </div>
  );
};

export default ButtonList;
