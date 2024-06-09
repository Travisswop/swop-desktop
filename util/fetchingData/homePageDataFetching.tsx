async function getHomePageData(token: string) {
  console.log("token", token);

  try {
    if (token) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DEV_URL}/api/v1/desktop/user`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );

      const data = await res.json();

      console.log("data fetchg", data);

      return data;
    } else {
      console.log("token doesn't exist on data load");
    }
  } catch (error) {
    console.error(error);
  }
}

export default getHomePageData;
