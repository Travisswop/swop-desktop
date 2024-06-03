"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SetUpMainAccountModal from "@/components/modal/SetupMainAccountModal";

const SetupMainAccount = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("signup");
  console.log("search", search);

  useEffect(() => {
    if (search === "success" || localStorage.getItem("modalShown")) {
      setShowModal(true);
      //   localStorage.setItem("modalShown", "true");
      //   router.replace("/", undefined);
    }
  }, [router]);

  // console.log("showmodal", showModal);

  return <div>{showModal && <SetUpMainAccountModal />}</div>;
};

export default SetupMainAccount;
