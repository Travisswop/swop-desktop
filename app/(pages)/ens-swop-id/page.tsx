import ClaimUserNameModal from "@/components/modal/ClaimUserName";
import React, { Suspense } from "react";
import ClaimEnsUserName from "./mainContent";

const EnsSwopId = async () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <ClaimEnsUserName />
      <Suspense fallback={<div>Loading...</div>}>
        <ClaimUserNameModal />
      </Suspense>
    </div>
  );
};

export default EnsSwopId;
