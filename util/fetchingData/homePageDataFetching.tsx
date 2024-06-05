async function getHomePageData(token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/desktop/user`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  return res.json();
}

export default getHomePageData;
