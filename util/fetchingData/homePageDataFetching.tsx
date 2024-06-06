async function getHomePageData(token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_DEV_URL}/api/v1/desktop/user`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  return await res.json();
}

export default getHomePageData;
