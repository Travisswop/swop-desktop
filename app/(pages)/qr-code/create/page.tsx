import CreateQRCode from "@/components/CustomQRCode/CreateQrCode";
import isUserAuthenticate from "@/util/isUserAuthenticate";
import React from "react";

const CreateQrCodePage = async () => {
  const session: any = await isUserAuthenticate();
  return <CreateQRCode session={session} />;
};

export default CreateQrCodePage;
