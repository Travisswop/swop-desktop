export const maxDuration = 60;
async function getSingleSmartsiteData(id: string, token: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DEV_URL}/api/v1/desktop/microsite/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const data = res.json();

    // console.log("data fetching for smartsite", data);

    return data;
  } catch (error) {
    console.error(error);
  }
}

export default getSingleSmartsiteData;
