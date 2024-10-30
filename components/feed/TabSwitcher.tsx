import Link from "next/link";
import React from "react";
import DynamicPrimaryBtn from "../Button/DynamicPrimaryBtn";
import AnimateButton from "../Button/AnimateButton";

type Tab = "feed" | "timeline" | "transaction";

interface TabProps {
  tab?: Tab;
}

const TabSwitcher = ({ tab }: TabProps) => {
  return (
    <div className="flex items-center gap-2">
      <Link href="?tab=feed">
        {tab === "feed" || !tab ? (
          <DynamicPrimaryBtn
            enableGradient={false}
            className="!rounded w-28 hover:!bg-black"
          >
            Feed
          </DynamicPrimaryBtn>
        ) : (
          <AnimateButton width="w-28" className="!rounded">
            Feed
          </AnimateButton>
        )}
      </Link>
      <Link href="?tab=timeline">
        {tab === "timeline" ? (
          <DynamicPrimaryBtn enableGradient={false} className="!rounded w-28">
            Timeline
          </DynamicPrimaryBtn>
        ) : (
          <AnimateButton width="w-28" className="!rounded">
            Timeline
          </AnimateButton>
        )}
      </Link>
      <Link href="?tab=transaction">
        {tab === "transaction" ? (
          <DynamicPrimaryBtn enableGradient={false} className="!rounded w-32">
            Transaction
          </DynamicPrimaryBtn>
        ) : (
          <AnimateButton width="w-32" className="!rounded">
            Transaction
          </AnimateButton>
        )}
      </Link>
    </div>
  );
};

export default TabSwitcher;
