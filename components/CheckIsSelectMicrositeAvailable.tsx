"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CheckIsSelectMicrositeAvailable = ({ children }: any) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const selectedMicrosite = localStorage.getItem("selected smartsite");

      if (!selectedMicrosite) {
        router.push("/select-smartsite");
      }
    }
  }, [router]);
  return <>{children}</>;
};

export default CheckIsSelectMicrositeAvailable;
