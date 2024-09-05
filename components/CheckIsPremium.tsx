"use client";
import { useRouter } from "next/navigation";

const CheckIsPremium = ({ session }: any) => {
  const router = useRouter();
  if (session.isPremiumUser) {
    router.push("/subscribe");
  }
  return null;
};

export default CheckIsPremium;
