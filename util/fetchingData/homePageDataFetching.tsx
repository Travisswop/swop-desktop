"use server";
async function getHomePageData(token: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DEV_URL}/api/v1/desktop/user`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        next: { revalidate: 300 },
      }
    );

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export default getHomePageData;
