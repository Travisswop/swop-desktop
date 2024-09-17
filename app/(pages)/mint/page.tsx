import React from "react";
import MintCart from "@/components/MintCart";
import Link from "next/link";
import PushToMintCollectionButton from "@/components/Button/PushToMintCollectionButton";
import getMintPageData, { GroupedTemplates } from "@/util/fetchingData/getMintPageData";
import HomePageLoading from "@/components/loading/HomePageLoading";
import ForceSignOut from "@/components/ForceSignOut";
import { GetServerSideProps } from "next";
import isUserAuthenticate from "@/util/isUserAuthenticate";

interface MintDashboardProps {
  session: any;
  data: any;
}

const MintDashboard: React.FC<MintDashboardProps> = ({ session, data }) => {
  // Force sign out if user is unauthenticated
  if (!session) {
    return <ForceSignOut />;
  }

  // Handle loading state or fallback
  if (!data) {
    return <HomePageLoading />;
  }

  // Check for no collections case (404)
  if ("noCollections" in data && data.noCollections) {
    return (
      <main className="main-container">
        <div className="bg-white p-4 text-center">
          <h4>No collections found for the user.</h4>
          <PushToMintCollectionButton className="!py-2 my-4">Create Collection</PushToMintCollectionButton>
        </div>
      </main>
    );
  }

  // Check if `data` contains `data` property and map over it
  if ("data" in data && Array.isArray(data.data)) {
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
                    collectionId={group.collection.id}
                    templateId={template.templateId}
                  />
                ))}
              </div>
              <Link href={"/mint/createTemplate"} className="flex justify-center my-6">
                <button
                  className="px-4 py-2 text-sm font-medium border border-gray-400 rounded-lg"
                  onClick={() => {
                    // Update local storage with the collection ID
                    localStorage.setItem("swop_desktop_selected_collection_id", group.collection.id);
                  }}
                >
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
  }

  // Fallback in case data does not match expected structure
  return <HomePageLoading />;
};

// Fetch session and data from the server side using getServerSideProps
export const getServerSideProps: GetServerSideProps = async () => {
  const session:any = await isUserAuthenticate(); // Fetch session from the server
  if (!session) {
    return {
      props: {
        session: null,
        data: null,
      },
    };
  }

  // Fetch mint page data with the session's access token
  const data = await getMintPageData(session.accessToken);

  return {
    props: {
      session,
      data,
    },
  };
};

export default MintDashboard;
