import ClaimUserNameModal from "@/components/modal/ClaimUserName";
import React, { Suspense } from "react";
import ClaimEnsUserName from "./mainContent";
import isUserAuthenticate from "@/util/isUserAuthenticate";

const EnsSwopId = async () => {
  const session: any = await isUserAuthenticate();

  return (
    <div className="flex-1 flex items-center justify-center">
      <ClaimEnsUserName token={session.accessToken} />
      <Suspense fallback={<div>Loading...</div>}>
        <ClaimUserNameModal />
      </Suspense>
    </div>
  );
};

export default EnsSwopId;
