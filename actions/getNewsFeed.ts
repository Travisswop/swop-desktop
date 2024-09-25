"use server";
export async function getNewsFeed(id: string, token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/desktop/feed/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error from action:", error);
  }
}
