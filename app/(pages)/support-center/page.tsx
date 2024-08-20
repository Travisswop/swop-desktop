import isUserAuthenticate from "@/util/isUserAuthenticate";
import React from "react";

const SupportCenter = async () => {
  await isUserAuthenticate(); // check is user exist
  return <div>AI Assistant not Available Now....</div>;
};

export default SupportCenter;
