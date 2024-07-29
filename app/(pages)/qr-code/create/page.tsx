import CreateQRCode from "@/components/CustomQRCode/CreateQrCode";
import ForceSignOut from "@/components/ForceSignOut";
import isUserAuthenticate from "@/util/isUserAuthenticate";
import React from "react";

const CreateQrCodePage = async () => {
  const session: any = await isUserAuthenticate();
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/api/v1/desktop/microsite/withoutPopulate`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization: `Bearer ${session.accessToken as string}`,
  //       },
  //     }
  //   );

  //   const data = await response.json();

  //   if (data && data.state === "fail") {
  //     return <ForceSignOut />;
  //   }

  console.log("session", session);

  return <CreateQRCode session={session} />;
};

export default CreateQrCodePage;
