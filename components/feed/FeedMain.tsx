"use client";
import React, { useState } from "react";
import Feed from "./Feed";
import Timeline from "./Timeline";
import Transaction from "./Transaction";
import PostFeed from "./PostFeed";

const FeedMain = ({ tab, session }: any) => {
  const [isPosting, setIsPosting] = useState(false);

  const [isPostLoading, setIsPostLoading] = useState(false);

  console.log("isposting", isPosting);

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
      ComponentToRender = <Timeline />;
      break;
    case "transaction":
      ComponentToRender = <Transaction />;
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
    <div>
      {/* posting feed here  */}
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
  );
};

export default FeedMain;
