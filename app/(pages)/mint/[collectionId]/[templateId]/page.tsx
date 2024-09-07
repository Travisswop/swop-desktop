// app/(pages)/mint/[collectionId]/[templateId]/page.tsx
import {getTemplateDetails} from "@/util/fetchingData/getTemplateDetails";
import isUserAuthenticate from "@/util/isUserAuthenticate";

// This is a server component
export default async function TemplateDetailsPage({ params }: { params: { collectionId: string, templateId: string } }) {
  const { collectionId, templateId } = params;

  // Call the authentication function to retrieve the session token
  const session:any = await isUserAuthenticate();

  if (!session || !session.accessToken) {
    return <div>Error: Unauthorized access</div>;
  }

  // Fetch the template details using the access token
  const templateDetails = await getTemplateDetails(collectionId, templateId, session.accessToken);

  if (!templateDetails) {
    return <div>Error loading template details</div>;
  }

  // Render the template details on the page
  return (
    <div>
      <h1>{templateDetails.template.metadata.name}</h1>
      <p>{templateDetails.template.metadata.description}</p>
      <img src={templateDetails.template.metadata.image} alt={templateDetails.template.metadata.name} />
    </div>
  );
}
