"use server";
async function getHomePageData(token: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/desktop/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        next: { revalidate: 5 },
      }
    );

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export default getHomePageData;



