import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const SupportCenter = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect(`/signin`);
  }
  return <div>AI Assistant Available Now....</div>;
};

export default SupportCenter;
