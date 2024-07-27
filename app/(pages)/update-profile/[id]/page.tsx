import React from "react";
import UpdateProfile from "../mainContent";
import isUserAuthenticate from "@/util/isUserAuthenticate";
import ForceSignOut from "@/components/ForceSignOut";

const UpdateProfilePage = async ({ params }: { params: { id: string } }) => {
  const session: any = await isUserAuthenticate();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/desktop/user/${params.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session.accessToken}`,
      },
    }
  );
  const data = await response.json();
  if (data && data.state === "fail") {
    return <ForceSignOut />;
  }
  // console.log("data from update profile", data);

  return (
    <div>
      <UpdateProfile data={data} token={session.accessToken} />
    </div>
  );
};

export default UpdateProfilePage;
