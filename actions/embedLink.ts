"use server";

import { revalidatePath } from "next/cache";

export async function postEmbedLink(embedInfo: any, token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v4/microsite/embed`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          micrositeId: embedInfo.micrositeId,
          link: embedInfo.link,
          type: embedInfo.type,
        }),
      }
    );
    revalidatePath(`/smartsites/icons/${embedInfo.micrositeId}`);
    const data = await response.json();
    // console.log("data from action", data);

    return data;
  } catch (error) {
    console.error("Error from action:", error);
  }
}

export async function updateEmbedLink(appIconInfo: any, token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v4/microsite/socialLarge`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(appIconInfo),
      }
    );
    revalidatePath(`/smartsites/icons/${appIconInfo.micrositeId}`);
    const data = await response.json();
    // console.log("data from action", data);
    return data;
  } catch (error) {
    console.error("Error from action:", error);
  }
}

export async function deleteEmbedLink(appIconInfo: any, token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v4/microsite/socialLarge`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(appIconInfo),
      }
    );
    revalidatePath(`/smartsites/icons/${appIconInfo.micrositeId}`);
    const data = await response.json();
    // console.log("data from action", data);
    return data;
  } catch (error) {
    console.error("Error from action:", error);
  }
}
