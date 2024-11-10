"use client";
import React, { useCallback, useEffect, useState } from "react";
import { FaRegImage, FaUser } from "react-icons/fa";
import { HiOutlineGif } from "react-icons/hi2";
import { IoSend } from "react-icons/io5";
import Emoji from "./Emoji";
import { getFeedComments, postComment } from "@/actions/postFeed";
import { MdScheduleSend } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { FiPlusCircle } from "react-icons/fi";
import isUrl from "@/util/isUrl";
import { GoDotFill } from "react-icons/go";
import dayjs from "dayjs";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { HiDotsHorizontal } from "react-icons/hi";
import { RiEdit2Fill } from "react-icons/ri";
import FeedLoading from "../loading/FeedLoading";
import DeleteFeedComment from "./DeleteFeedComment";

const CommentContent = ({
  postId,
  accessToken,
  latestCommentCount,
  setLatestCommentCount,
}: any) => {
  const [postComments, setPostComments] = useState<any>(null);
  const [commentLoading, setCommentLoading] = useState(true);
  const [commentPostContent, setCommentPostContent] = useState("");
  const [smartsiteId, setSmartsiteId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isCommentDelete, setIsCommentDelete] = useState(false);

  const MAX_LENGTH = 280;

  const handleCommentChange = (e: any) => {
    const value = e.target.value;

    // Check if the content length exceeds the max length
    if (value.length > MAX_LENGTH) {
      setError(`** Comment cannot exceed ${MAX_LENGTH} characters.`);
    } else {
      setError("");
    }

    setCommentPostContent(value);
  };
  const handleEmojiSelect = (emoji: string) => {
    setCommentPostContent((prevContent) => prevContent + emoji);
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      const smartsiteId = localStorage.getItem("userPrimaryMicrosite");
      if (smartsiteId) {
        setSmartsiteId(smartsiteId);
      }
    }
  }, []);

  const fetchFeedData = useCallback(async () => {
    //   if (isFetching.current) return; // Prevent duplicate fetch
    //   isFetching.current = true;

    setCommentLoading(true);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/feed/comment/${postId}?page=${page}&limit=5`;

    const newFeedData = await getFeedComments(url, accessToken);

    setPostComments(newFeedData);

    setCommentLoading(false);

    //   if (reset) {
    //     setFeedData(newFeedData.data); // Reset data when refetching
    //     setPage(2); // Set page to 2 after initial load for pagination
    //     setHasMore(newFeedData.data.length > 0); // Update hasMore based on response
    //     setIsPostLoading(false);
    //   } else {
    //     if (newFeedData.data.length === 0) {
    //       setHasMore(false); // Stop pagination if no more data
    //       setIsPostLoading(false);
    //     } else {
    //       setFeedData((prev) => [...prev, ...newFeedData.data]);
    //       setIsPostLoading(false);
    //     }
    //   }

    //   isFetching.current = false;
  }, [accessToken, page, postId]);

  // Initial fetch and fetch on page increment
  useEffect(() => {
    fetchFeedData();
  }, [page, fetchFeedData]);

  useEffect(() => {
    if (isCommentDelete) {
      fetchFeedData();
      setIsCommentDelete(false);
    }
  }, [fetchFeedData, isCommentDelete]);

  const handleCommentPost = async () => {
    setIsLoading(true);
    const payload = {
      postId,
      smartsiteId,
      commentText: commentPostContent,
    };
    const createComment = await postComment(payload, accessToken);
    setLatestCommentCount(latestCommentCount + 1);
    setCommentPostContent("");
    fetchFeedData();
    setIsLoading(false);
  };

  console.log("ostComments", postComments);

  return (
    <div className="">
      <hr className="my-3" />
      <div className="">
        <textarea
          name="commentText"
          id="commentText"
          rows={2}
          className={`bg-gray-100 rounded-lg p-3  w-full ${
            commentPostContent.length > MAX_LENGTH
              ? "border-red-500 focus:outline-red-500"
              : "border-gray-300 focus:outline-gray-200"
          }`}
          placeholder="Type Comment..."
          value={commentPostContent}
          onChange={handleCommentChange}
          style={{ borderWidth: 1 }}
        ></textarea>
        {error && (
          <p className="text-red-500 text-sm -translate-y-1">{error}</p>
        )}
        <div className="flex items-center gap-6 justify-between">
          <div className="flex items-center gap-3">
            <FaRegImage size={22} className={"text-gray-400"} />
            <HiOutlineGif size={23} className={"text-gray-400"} />
            <Emoji onEmojiSelect={handleEmojiSelect} />
          </div>
          <button
            onClick={handleCommentPost}
            disabled={
              commentPostContent.length > MAX_LENGTH ||
              commentPostContent.length === 0 ||
              isLoading
            }
          >
            {isLoading ? (
              <MdScheduleSend size={23} className="text-gray-700" />
            ) : (
              <IoSend
                size={22}
                className={`${
                  commentPostContent.length > MAX_LENGTH ||
                  commentPostContent.length === 0
                    ? "text-gray-400"
                    : "text-gray-700"
                }`}
              />
            )}
          </button>
        </div>
      </div>
      <hr className="my-3" />
      {commentLoading ? (
        <FeedLoading />
      ) : (
        <div>
          {postComments.comments.map((comment: any) => (
            <div
              key={comment._id}
              className="flex gap-2 border-b border-gray-200 pb-4 mt-4"
            >
              <div className="w-10 h-10 bg-gray-400 border border-gray-300 rounded-full overflow-hidden flex items-center justify-center">
                {(() => {
                  const profilePic =
                    comment?.smartsiteId?.profilePic ||
                    comment?.smartsiteProfileImage;

                  if (profilePic) {
                    return isUrl(profilePic) ? (
                      <Image
                        alt="user image"
                        src={profilePic}
                        width={90}
                        height={90}
                        className="rounded-full w-full h-full"
                      />
                    ) : (
                      <Image
                        alt="user image"
                        src={`/images/user_avator/${profilePic}.png`}
                        width={90}
                        height={90}
                        className="rounded-full w-full h-full"
                      />
                    );
                  } else {
                    return <FaUser size={28} color="white" />;
                  }
                })()}
              </div>
              <div className="w-full">
                {/* User and Feed Info */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-base">
                      <p className="text-gray-700 font-semibold">
                        {comment?.smartsiteId?.name ||
                          comment?.smartsiteName ||
                          "Anonymous"}
                      </p>
                      <GoDotFill size={10} />
                      <p className="text-gray-500 font-normal">
                        {comment?.smartsiteId?.ens ||
                          comment?.smartsiteEns ||
                          "n/a"}
                      </p>
                      <GoDotFill size={10} />
                      <p className="text-gray-500 font-normal">
                        {dayjs(comment.createdAt).fromNow()}
                      </p>
                    </div>
                    {/* Post Content */}
                    {comment.commentText && (
                      <div className="text-sm">
                        {comment.commentText
                          .split("\n")
                          .map((line: any, index: number) => (
                            <p key={index}>{line}</p>
                          ))}
                      </div>
                    )}
                  </div>
                  {comment.smartsiteId._id === smartsiteId && (
                    <div>
                      <Popover
                        backdrop="opaque"
                        placement="bottom-end"
                        showArrow={true}
                        style={{ zIndex: 10 }}
                        // shouldBlockScroll={true}
                        // shouldUpdatePosition={false}
                      >
                        <PopoverTrigger>
                          <button type="button">
                            <HiDotsHorizontal size={20} />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="px-1 py-2 flex flex-col">
                            {/* <button className="text-gray-700 flex items-center gap-1 font-medium border-b p-1 text-sm">
                              <RiEdit2Fill color="black" size={18} /> Edit
                            </button> */}
                            <DeleteFeedComment
                              commentId={comment._id}
                              accessToken={accessToken}
                              setIsCommentDelete={setIsCommentDelete}
                              latestCommentCount={latestCommentCount}
                              setLatestCommentCount={setLatestCommentCount}
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                </div>
                {/* <Reaction
                postId={feed._id}
                likeCount={feed.likeCount}
                commentCount={feed.commentCount}
                repostCount={feed.repostCount}
                viewsCount={feed.viewsCount}
                accessToken={accessToken}
              /> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentContent;
