import ForceSignOut from "@/components/ForceSignOut";
import EditOldQRCode from "@/components/smartsiteList/EditOldQrCode";
import EditQRCode from "@/components/smartsiteList/EditQrCode";
import isUserAuthenticate from "@/util/isUserAuthenticate";
import React from "react";

const EditQrCodePage = async ({ params }: { params: { id: string } }) => {
  const session: any = await isUserAuthenticate();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v4/microsite/getQrCode/${params.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session.accessToken as string}`,
      },
    }
  );

  const data = await response.json();

  // if (data && data.state === "fail") {
  //   return <ForceSignOut />;
  // }

  console.log("data gg", data);

  if (data && data.state === "failed") {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/desktop/microsite/withoutPopulate/${params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session.accessToken as string}`,
        },
      }
    );
    const data = await response.json();
    console.log("failed", data.data);

    return (
      <div>
        {data && data.data && (
          <EditOldQRCode
            profileUrl={data.data.profileUrl}
            micrositeId={data.data._id}
            token={session.accessToken}
          />
        )}
      </div>
    );
  }

  if (data && data.state === "success") {
    return (
      <div>
        {data && data.data && (
          <EditQRCode
            qrCodeData={data.data}
            // micrositeId={data.data.microsite}
            token={session.accessToken}
          />
        )}
      </div>
    );
  }
};

export default EditQrCodePage;
