import React, { Suspense } from "react";
import getSingleSmartsiteData from "@/util/fetchingData/singleSmartsiteDataFetching";
import isUserAuthenticate from "@/util/isUserAuthenticate";
import ForceSignOut from "@/components/ForceSignOut";
import EditSmartSite from "../../[editId]/mainContent";
import MicrositeEditMainContentPage from "./mainContent";

const SmartsiteUpdatePage = async ({
  params,
}: {
  params: { editId: string };
}) => {
  const session: any = await isUserAuthenticate();
  const data = await getSingleSmartsiteData(
    params.editId,
    session.accessToken as string
  );

  if (data && data.state === "fail") {
    return <ForceSignOut />;
  }

  return (
    <div>
      <Suspense fallback={<p>Loading feed...</p>}>
        <MicrositeEditMainContentPage token={session.accessToken} data={data} />
      </Suspense>
    </div>
  );
};

export default SmartsiteUpdatePage;
