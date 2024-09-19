import React from "react";
import WalletMessageList from "../message/WalletMessageList";

const HomepageWalletMessage = async () => {
  return (
    <div className="h-full relative overflow-hidden">
      {/* wallet message  */}
      <WalletMessageList />
    </div>
  );
};

export default HomepageWalletMessage;
