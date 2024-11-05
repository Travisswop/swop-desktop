"use client";
import { Tooltip } from "@nextui-org/react";
import React from "react";
import { BiMessageSquare, BiRepost } from "react-icons/bi";
import { FiHeart, FiShare } from "react-icons/fi";
import { RiBarChartGroupedFill } from "react-icons/ri";

const Reaction = () => {
  return (
    <div className="flex items-center justify-between gap-2 mt-2 text-gray-700 font-normal">
      <Tooltip
        className="text-xs font-medium"
        placement={"bottom"}
        showArrow={true}
        content="Reply"
      >
        <button className="flex items-center gap-1 text-sm font-medium">
          <BiMessageSquare size={17} />
          <p>120</p>
        </button>
      </Tooltip>

      <Tooltip
        className="text-xs font-medium"
        placement={"bottom"}
        showArrow={true}
        content="Repost"
      >
        <button className="flex items-center gap-1 text-sm font-medium">
          <BiRepost size={21} />
          <p>120</p>
        </button>
      </Tooltip>

      <Tooltip
        className="text-xs font-medium"
        placement={"bottom"}
        showArrow={true}
        content="Like"
      >
        <button className="flex items-center gap-1 text-sm font-medium">
          <FiHeart size={17} />
          <p>120</p>
        </button>
      </Tooltip>

      <Tooltip
        className="text-xs font-medium"
        placement={"bottom"}
        showArrow={true}
        content="View"
      >
        <button className="flex items-center gap-1 text-sm font-medium">
          <RiBarChartGroupedFill size={17} />
          <p>120</p>
        </button>
      </Tooltip>

      <Tooltip
        className="text-xs font-medium"
        placement={"bottom"}
        showArrow={true}
        content="Share"
      >
        <button className="flex items-center gap-1 text-sm font-medium">
          <FiShare size={17} />
        </button>
      </Tooltip>
    </div>
  );
};

export default Reaction;
