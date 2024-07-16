import ForceSignOut from "@/components/ForceSignOut";
import EditQRCode from "@/components/smartsiteList/EditQrCode";
import isUserAuthenticate from "@/util/isUserAuthenticate";
import React from "react";

const EditQrCodePage = async ({ params }: { params: { id: string } }) => {
  const session: any = await isUserAuthenticate();
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

  if (data && data.state === "fail") {
    return <ForceSignOut />;
  }

  return (
    <div>
      {data && data.data && (
        <EditQRCode
          profileUrl={data.data.profileUrl}
          id={data.data._id}
          token={session.accessToken}
        />
      )}
    </div>
  );
};

export default EditQrCodePage;
