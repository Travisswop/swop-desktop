// app/(pages)/mint/[collectionId]/[templateId]/page.tsx

import { getTemplateDetails } from "@/util/fetchingData/getTemplateDetails";
import isUserAuthenticate from "@/util/isUserAuthenticate";
import MintDetails from "@/components/MintDetails";

// This is a server component
export default async function TemplateDetailsPage({ params }: { params: { collectionId: string, templateId: string } }) {
  const { collectionId, templateId } = params;

  // Call the authentication function to retrieve the session token
  const session: any = await isUserAuthenticate();

  if (!session || !session.accessToken) {
    return <div>Error: Unauthorized access</div>;
  }

  // Fetch the template details using the access token
  const templateDetails = await getTemplateDetails(collectionId, templateId, session.accessToken);

  if (!templateDetails) {
    return <div>Error loading template details</div>;
  }

  // Pass the fetched data as props to the client component
  return <MintDetails templateDetails={templateDetails} />;
}
