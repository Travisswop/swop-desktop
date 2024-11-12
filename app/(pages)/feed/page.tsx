import React from "react";
import TabSwitcher from "@/components/feed/TabSwitcher";
import SearchSwopId from "@/components/feed/SearchSwopId";
import isUserAuthenticate from "@/util/isUserAuthenticate";
import FeedMain from "@/components/feed/FeedMain";

type Tab = "feed" | "timeline" | "transaction";
interface PageProps {
  searchParams: {
    tab?: Tab;
  };
}

const FeedPage = async ({ searchParams }: PageProps) => {
  const session: any = await isUserAuthenticate();

  // console.log("session", session);

  const { tab } = searchParams;

  return (
    <div className="main-container">
      <div className="bg-white rounded-xl">
        <div className="pb-6 border-b border-gray-200">
          <div className="flex items-center justify-between px-6 pt-6 sticky top-10 z-10">
            {/* tab switcher */}
            <TabSwitcher tab={tab} />
            {/* search with swop id */}
            {/* <SearchSwopId /> */}
          </div>
        </div>
        <FeedMain tab={tab} session={session} />
      </div>
    </div>
  );
};

export default FeedPage;
