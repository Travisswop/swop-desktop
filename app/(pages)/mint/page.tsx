"use client"
import React, { useEffect, useState } from "react";
import MintCart from "@/components/MintCart";
import PushToMintCollectionButton from "@/components/Button/PushToMintCollectionButton";
import isUserAuthenticate from "@/util/isUserAuthenticate";
import getMintPageData, { GroupedTemplates } from "@/util/fetchingData/getMintPageData";
import HomePageLoading from "@/components/loading/HomePageLoading";
import ForceSignOut from "@/components/ForceSignOut";

const MintDashboard = () => {
  const [session, setSession] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch session and data on the client side
    const fetchData = async () => {
      const sessionData:any = await isUserAuthenticate();
      if (!sessionData) {
        setSession(null); // Unauthenticated
      } else {
        setSession(sessionData);
        const pageData = await getMintPageData(sessionData.accessToken);
        setData(pageData);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Handle redirect and local storage setting
  const handleAddNFT = (collectionId: string) => {
    // Update the local storage with the collection ID
    localStorage.setItem("swop_desktop_selected_collection_id", collectionId);
    // Redirect to the desired page
    window.location.href = "/mint/createTemplate";
  };

  if (loading) {
    return <HomePageLoading />;
  }

  if (!session) {
    return <ForceSignOut />;
  }

  if (!data || (data && data.noCollections)) {
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
                  collectionId={group.collection.id}
                  templateId={template.templateId}
                />
              ))}
            </div>
            <div className="flex justify-center my-6">
              <button
                className="px-4 py-2 text-sm font-medium border border-gray-400 rounded-lg"
                onClick={() => handleAddNFT(group.collection.id)}
              >
                Add NFTs To This Collection
              </button>
            </div>
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
