"use client";
import React, { Suspense, useState } from "react";
import Feed from "./Feed";
import Timeline from "./Timeline";
import Transaction from "./Transaction";
import PostFeed from "./PostFeed";
import Connections from "../Connections";

const FeedMain = ({ tab, session }: any) => {
  const [isPosting, setIsPosting] = useState(false);
  const [isPostLoading, setIsPostLoading] = useState(false);

  // console.log("isposting", isPosting);

  let ComponentToRender: JSX.Element;

  switch (tab) {
    case "feed":
      ComponentToRender = (
        <Feed
          accessToken={session.accessToken}
          userId={session._id}
          setIsPosting={setIsPosting}
          isPosting={isPosting}
          setIsPostLoading={setIsPostLoading}
          isPostLoading={isPostLoading}
        />
      );
      break;
    case "timeline":
      ComponentToRender = (
        <Timeline
          accessToken={session.accessToken}
          userId={session._id}
          setIsPosting={setIsPosting}
          isPosting={isPosting}
          setIsPostLoading={setIsPostLoading}
          isPostLoading={isPostLoading}
        />
      );
      break;
    case "transaction":
      ComponentToRender = (
        <Transaction
          accessToken={session.accessToken}
          userId={session._id}
          setIsPosting={setIsPosting}
          isPosting={isPosting}
          setIsPostLoading={setIsPostLoading}
          isPostLoading={isPostLoading}
        />
      );
      break;
    default:
      ComponentToRender = (
        <Feed
          accessToken={session.accessToken}
          userId={session._id}
          setIsPosting={setIsPosting}
          isPosting={isPosting}
          setIsPostLoading={setIsPostLoading}
          isPostLoading={isPostLoading}
        />
      ); // Default to Feed
  }
  return (
    <div className="w-full flex relative">
      <div
        style={{ height: "calc(100vh - 108px)" }}
        className="w-3/5 xl:w-2/3 2xl:w-[54%] overflow-y-auto"
      >
        <PostFeed
          userId={session._id}
          token={session.accessToken}
          setIsPosting={setIsPosting}
          setIsPostLoading={setIsPostLoading}
        />
        <hr />
        {/* component to render based on tab */}
        <section className="p-6">{ComponentToRender}</section>
      </div>
      <div
        style={{ height: "calc(100vh - 108px)" }}
        className="flex-1 overflow-y-auto"
      >
        <Suspense fallback={"loading..."}>
          <Connections userId={session._id} accessToken={session.accessToken} />
        </Suspense>
      </div>
    </div>
  );
};

export default FeedMain;
