import React from "react";
import MintCart from "@/components/MintCart";
import Link from "next/link";
import DynamicPrimaryBtn from "@/components/Button/DynamicPrimaryBtn";
import isUserAuthenticate from "@/util/isUserAuthenticate";
import getMintPageData, { GroupedTemplates } from "@/util/fetchingData/getMintPageData";
import HomePageLoading from "@/components/loading/HomePageLoading";

const MintDashboard = async () => {
  const session: any = await isUserAuthenticate(); // check if user exists

  console.log("Session:", session); // Check if session is valid
  const data = await getMintPageData(session.accessToken);

  console.log("Fetched data:", data); // Check the fetched data

  // Add fallback in case data is null
  if (!data || !data.data || data.data.length === 0) {
    console.error("Data is null or empty");
    return <HomePageLoading />;
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
            <Link href={""} className="flex justify-center my-6">
              <button className="px-4 py-2 text-sm font-medium border border-gray-400 rounded-lg">
                Add NFTs To This Collection
              </button>
            </Link>
          </div>
        ))}
        <div className="flex justify-center">
          <DynamicPrimaryBtn className="!py-2">Create Collection</DynamicPrimaryBtn>
        </div>
      </div>
    </main>
  );
};

export default MintDashboard;
