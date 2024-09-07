export async function getTemplateDetails(collectionId: string, templateId: string, token: string) {
    const apiUrl = `${process.env.LOCAL_BASE_URL}/api/v1/desktop/nft/getTemplateDetails?collectionId=${collectionId}&templateId=${templateId}`;

    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch template details");
        }

        const data = await response.json();
        return data.data;  // Assuming the template details are located inside `data.data`
    } catch (error) {
        console.error("Error fetching template details:", error);
        return null;
    }
}