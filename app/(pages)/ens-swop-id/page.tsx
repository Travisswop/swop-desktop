import ClaimUserNameModal from "@/components/modal/ClaimUserName";
import React from "react";
import ClaimEnsUserName from "./mainContent";

const EnsSwopId = async () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <ClaimEnsUserName />
      <ClaimUserNameModal />
    </div>
  );
};

export default EnsSwopId;
