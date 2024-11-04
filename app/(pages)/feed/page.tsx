import React from "react";
import Feed from "@/components/feed/Feed";
import Timeline from "@/components/feed/Timeline";
import Transaction from "@/components/feed/Transaction";
import PostFeed from "@/components/feed/PostFeed";
import TabSwitcher from "@/components/feed/TabSwitcher";
import SearchSwopId from "@/components/feed/SearchSwopId";
import isUserAuthenticate from "@/util/isUserAuthenticate";

type Tab = "feed" | "timeline" | "transaction";
interface PageProps {
  searchParams: {
    tab?: Tab;
  };
}

const FeedPage = async ({ searchParams }: PageProps) => {
  const session: any = await isUserAuthenticate();

  const { tab } = searchParams;

  let ComponentToRender: JSX.Element;

  switch (tab) {
    case "feed":
      ComponentToRender = <Feed />;
      break;
    case "timeline":
      ComponentToRender = <Timeline />;
      break;
    case "transaction":
      ComponentToRender = <Transaction />;
      break;
    default:
      ComponentToRender = <Feed />; // Default to Feed
  }

  return (
    <div className="main-container">
      <div className="bg-white rounded-xl">
        <div className="pb-6 border-b border-gray-200">
          <div className="flex items-center justify-between px-6 pt-6">
            {/* tab switcher */}
            <TabSwitcher tab={tab} />
            {/* search with swop id */}
            <SearchSwopId />
          </div>
        </div>
        {/* posting feed here  */}
        <PostFeed userId={session._id} token={session.accessToken} />
        <hr />
        {/* component to render based on tab */}
        <section className="p-6">{ComponentToRender}</section>
      </div>
    </div>
  );
};

export default FeedPage;
