import React from "react";
import MintCart from "@/components/MintCart";
import Link from "next/link";
import PushToMintCollectionButton from "@/components/Button/PushToMintCollectionButton";
import isUserAuthenticate from "@/util/isUserAuthenticate";
import getMintPageData, { GroupedTemplates } from "@/util/fetchingData/getMintPageData";
import HomePageLoading from "@/components/loading/HomePageLoading";
import ForceSignOut from "@/components/ForceSignOut";

const MintDashboard = async () => {
  const session: any = await isUserAuthenticate(); // check if user exists

  console.log("Session:", session); // Check if session is valid

  // Force sign out if user is unauthenticated
  if (!session) {
    return <ForceSignOut />;
  }

  const data = await getMintPageData(session.accessToken);

  console.log("Fetched data:", data); // Check the fetched data

  // Handle loading state or fallback
  if (!data) {
    console.error("Data is null or empty");
    return <HomePageLoading />;
  }

  // Check for no collections case (404)
  if ('noCollections' in data && data.noCollections) {
    return (
      <main className="main-container">
        <div className="bg-white p-4 text-center">
          <h4>No collections found for the user.</h4>
          <PushToMintCollectionButton className="!py-2 my-4">Create Collection</PushToMintCollectionButton>
        </div>
      </main>
    );
  }

  return (
    <main className="main-container">
      <div className="bg-white p-4">
        {/* Render collections dynamically */}
        {data.data.map((group: GroupedTemplates) => (
          <div key={group.collection.id}>
            <h6 className="heading-4 mb-4">{group.collection.metadata.name}</h6>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 xl:gap-10 2xl:gap-16">
              {group.templates.map((template) => (
                <MintCart
                  key={template.templateId}
                  img={template.metadata.image}
                  title={template.metadata.name}
                  text={`Limit: ${template.supply.limit}, Minted: ${template.supply.minted}`}
                  collectionId={group.collection.id} // Pass collectionId
                  templateId={template.templateId} // Pass templateId
                />
              ))}
            </div>
            <Link href={"/mint/createTemplate"} className="flex justify-center my-6">
              <button className="px-4 py-2 text-sm font-medium border border-gray-400 rounded-lg">
                Add NFTs To This Collection
              </button>
            </Link>
          </div>
        ))}
        <div className="flex justify-center">
          <PushToMintCollectionButton className="!py-2">Create Collection</PushToMintCollectionButton>
        </div>
      </div>
    </main>
  );
};

export default MintDashboard;
