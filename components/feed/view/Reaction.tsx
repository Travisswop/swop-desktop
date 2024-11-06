"use client";
import { Tooltip } from "@nextui-org/react";
import React, { useState } from "react";
import { BiMessageSquare, BiRepost } from "react-icons/bi";
import { FiHeart, FiShare } from "react-icons/fi";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { RiBarChartGroupedFill } from "react-icons/ri";

const Reaction = ({
  smartsiteId,
  postId,
  likeCount: initialLikeCount,
  commentCount,
  repostCount,
  viewsCount,
}: {
  smartsiteId: string;
  postId: string;
  likeCount: number;
  commentCount: number;
  repostCount: number;
  viewsCount: number;
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [animate, setAnimate] = useState(false); // Trigger for the animation

  const handleLike = () => {
    if (!liked) {
      setLikeCount(likeCount + 1);
      setAnimate(true); // Start the animation
      setTimeout(() => setAnimate(false), 500); // Stop animation after 500ms
    } else {
      setLikeCount(likeCount - 1);
    }
    setLiked(!liked);

    // Optionally, call an API to persist the like status with smartsiteId and postId
  };

  return (
    <div className="flex items-center justify-between gap-2 mt-2 text-gray-700 font-normal">
      <Tooltip
        className="text-xs font-medium"
        placement="bottom"
        showArrow
        content="Reply"
      >
        <button className="flex items-center gap-1 text-sm font-medium w-12">
          <BiMessageSquare size={17} />
          <p>{commentCount}</p>
        </button>
      </Tooltip>

      <Tooltip
        className="text-xs font-medium"
        placement="bottom"
        showArrow
        content="Repost"
      >
        <button className="flex items-center gap-1 text-sm font-medium w-12">
          <BiRepost size={21} />
          <p>{repostCount}</p>
        </button>
      </Tooltip>

      <Tooltip
        className="text-xs font-medium"
        placement="bottom"
        showArrow
        content="Like"
      >
        <button
          onClick={handleLike}
          className={`relative flex items-center gap-1 text-sm font-medium w-12 ${
            liked ? "text-[#FF0000]" : ""
          }`}
        >
          {liked ? (
            <IoMdHeart size={17} color="red" />
          ) : (
            <IoMdHeartEmpty size={17} color="black" />
          )}
          <p>{likeCount}</p>

          {/* Heart animation effect */}
          <span
            className={`absolute top-[-10px] left-[10px] text-red-500 ${
              animate ? "animate-ping-heart" : "hidden"
            }`}
          >
            <IoMdHeart size={30} />
          </span>
        </button>
      </Tooltip>

      <Tooltip
        className="text-xs font-medium"
        placement="bottom"
        showArrow
        content="View"
      >
        <button className="flex items-center gap-1 text-sm font-medium w-12">
          <RiBarChartGroupedFill size={17} />
          <p>{viewsCount}</p>
        </button>
      </Tooltip>

      <Tooltip
        className="text-xs font-medium"
        placement="bottom"
        showArrow
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
