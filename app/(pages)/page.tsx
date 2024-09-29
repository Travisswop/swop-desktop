import { Suspense } from "react";
import isUserAuthenticate from "@/util/isUserAuthenticate";
import getHomePageData from "@/util/fetchingData/homePageDataFetching";
import ForceSignOut from "@/components/ForceSignOut";
import CreateQRCodeFromHome from "@/components/CreateQRCodeFromHome";

import Dashboard from "@/components/Home/Dashboard";
import HomepageWalletLoading from "@/components/loading/HomepageWalletLoading";
import HomepageSmartsite from "@/components/HomepageSmartsite";
import HomepageRecentLeads from "@/components/Home/HomepageRecentLeads";
import NewsFeed from "@/components/Home/NewsFeed";
import HomepageWebsiteAnalytics from "@/components/Home/HomepageWebsiteAnalytics";
import HomepageWalletMain from "@/components/Home/HomepageWalletMain";
import HomepageSetupMainAccount from "@/components/HomepageSetupMainAccount";
import HomepageNewsFeedLoading from "@/components/loading/HomepageNewsFeedLoading";
import HomepageSmartsiteLoading from "@/components/loading/HomepageSmartsiteLoading";
import HomepageWebsiteAnalyticsLoading from "@/components/loading/HomePageWebsiteAnalytics";
import HomepageRecentLeadsLoading from "@/components/loading/HomepageRecentLeadsLoading";

export default async function HomePage() {
  const session: any = await isUserAuthenticate(); // check if user exists

  if (!session) {
    <ForceSignOut />;
  }

  const homepageDataPromise = getHomePageData(session.accessToken as string);

  return (
    <>
      <main className="main-container flex-1 h-full overflow-auto">
        <div className="flex justify-between gap-6">
          <div className="w-3/5 gap-6">
            <div className=" bg-white py-5 px-6 flex items-center rounded-lg justify-center">
              <Dashboard />
            </div>
            <div className="bg-white py-5 px-6 flex items-center rounded-lg justify-center mt-4">
              <Suspense fallback={<HomepageNewsFeedLoading />}>
                <NewsFeed
                  homepageDataPromise={homepageDataPromise}
                  session={session}
                />
              </Suspense>
            </div>
          </div>
          <div className="w-2/5 bg-white px-6 py-6 flex items-start rounded-lg justify-center">
            <Suspense fallback={<HomepageWalletLoading />}>
              <HomepageWalletMain
                homepageDataPromise={homepageDataPromise}
                session={session}
              />
            </Suspense>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-6 items-stretch">
          {/* Smartsite */}
          <div>
            <div className="bg-white rounded-lg overflow-hidden">
              <Suspense fallback={<HomepageSmartsiteLoading />}>
                <HomepageSmartsite homepageDataPromise={homepageDataPromise} />
              </Suspense>
            </div>
            <Suspense fallback={<p>Loading QR Code...</p>}>
              <CreateQRCodeFromHome session={session} />
            </Suspense>
          </div>

          {/* Website Analytics */}
          <div className=" bg-white rounded-lg">
            <div className="p-6">
              <h3 className="text-lg text-gray-700 font-semibold mb-4">
                Website Analytics
              </h3>
              <Suspense fallback={<HomepageWebsiteAnalyticsLoading />}>
                <HomepageWebsiteAnalytics
                  homepageDataPromise={homepageDataPromise}
                />
              </Suspense>
            </div>

            <div className="pb-6">
              <h3 className="text-lg text-gray-700 font-semibold mb-4 pl-6">
                Recent Leads
              </h3>
              <Suspense fallback={<HomepageRecentLeadsLoading />}>
                <HomepageRecentLeads
                  homepageDataPromise={homepageDataPromise}
                  sessionUserName={session.name}
                />
              </Suspense>
            </div>
          </div>
        </div>
        <Suspense fallback={null}>
          <HomepageSetupMainAccount homepageDataPromise={homepageDataPromise} />
        </Suspense>
      </main>
    </>
  );
}
