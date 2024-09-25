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
              <Suspense fallback={<p>Loading newsfeed...</p>}>
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
              <Suspense fallback={<p>Loading homepage smartsite...</p>}>
                <HomepageSmartsite homepageDataPromise={homepageDataPromise} />
              </Suspense>
            </div>
            <Suspense fallback={<p>Loading homepage smartsite...</p>}>
              <CreateQRCodeFromHome session={session} />
            </Suspense>
          </div>

          {/* Website Analytics */}
          <div className="p-6 bg-white rounded-lg">
            <h3 className="text-lg text-gray-700 font-semibold mb-4">
              Website Analytics
            </h3>
            <Suspense fallback={"loading web analytics..."}>
              <HomepageWebsiteAnalytics
                homepageDataPromise={homepageDataPromise}
              />
            </Suspense>

            <h3 className="text-lg text-gray-700 font-semibold mt-6 mb-4">
              Recent Leads
            </h3>
            <Suspense fallback={"loading recent leads..."}>
              <HomepageRecentLeads homepageDataPromise={homepageDataPromise} />
            </Suspense>
          </div>
        </div>
        <Suspense fallback={"loading setup accout..."}>
          <HomepageSetupMainAccount homepageDataPromise={homepageDataPromise} />
        </Suspense>
      </main>
    </>
  );
}
