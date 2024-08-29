"use server";

export async function createWalletAction(
  ens: string,
  micrositeId: any,
  token: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v4/wallet/createWallet/${ens}`
    );
    const data = await response.json();

    const totalEns = `${ens}.swop.id`;

    //update microsite with _id (micrositeId), ens, primary
    if (data) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v4/microsite`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ _id: micrositeId, ens: totalEns }),
      });
      // const datas = await response.json();
    }
    return data;
  } catch (error) {
    console.error("Error from action:", error);
  }
}
