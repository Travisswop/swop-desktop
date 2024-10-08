"use client";
import React, { useState } from "react";
import TransectionList from "./TransectionList";
import TransectionDetailsView from "./TransectionDetailsView";

const TransectionView = ({
  microsites,
  transactionData,
  walletObj,
  flowData,
}: any) => {
  const [selectTransection, setSelectTransection] = useState(0);

  return (
    <div>
      {transactionData?.result?.length === 0 ? (
        <p className="!text-lg text-center py-8">No transaction available!</p>
      ) : (
        <div className="flex items-stretch gap-x-6 ">
          <div className="w-[60%] bg-white p-6">
            <TransectionList
              transactionData={transactionData}
              walletObj={walletObj}
              selectTransection={selectTransection}
              setSelectTransection={setSelectTransection}
            />
          </div>
          <div className="w-[40%] bg-white p-6">
            <TransectionDetailsView
              selectTransection={selectTransection}
              transactionData={transactionData}
              walletObj={walletObj}
              microsites={microsites}
              flowData={flowData}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TransectionView;
