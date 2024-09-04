"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SetUpMainAccountModal from "@/components/modal/SetupMainAccountModal";

const SetupMainAccount = ({ data }: any) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("signup");
  // console.log("search", search);

  // console.log("data", data);

  // useEffect(() => {
  //   if (typeof window !== undefined) {
  //     const selectedSmartsiteId = localStorage.getItem("selected smartsite");
  //     if (!selectedSmartsiteId) {
  //       router.push("/select-smartsite");
  //     }
  //   }
  // }, [router]);

  useEffect(() => {
    if (search === "success" || localStorage.getItem("modalShown")) {
      const myObject = {
        mobileNo: data?.data?.mobileNo,
        location: data?.data?.address,
      };
      setShowModal(true);
      localStorage.setItem("inititalUserData", JSON.stringify(myObject));
    }
  }, [data?.data?.address, data?.data?.mobileNo, router, search]);

  // console.log("showmodal", showModal);

  return <div>{showModal && <SetUpMainAccountModal />}</div>;
};

export default SetupMainAccount;
