import isUserAuthenticate from "@/util/isUserAuthenticate";
import SelectSmartsiteCart from "./_components/SelectSmartsiteCart";

const selectSmartsitePage = async () => {
  const userDetails: any = await isUserAuthenticate();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/desktop/user/${userDetails._id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userDetails.accessToken}`,
      },
    }
  );
  const data = await response.json();
  // console.log("smartsites", data.data.microsites.length);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#F3F4F6]">
      <div className="bg-white p-8 w-5/6 lg:w-2/3 rounded-xl flex flex-col items-center">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl text-center">
            Select Your Smartsite
          </h1>
          <p className="text-gray-600 font-medium text-sm text-center">
            Input Below for AI Smartsite Build.You can Edit After the <br />{" "}
            Site is Generated.
          </p>
        </div>
        <div
          className={`${
            data.data.microsites.length > 1
              ? "grid grid-cols-3 2xl:grid-cols-4"
              : "flex flex-wrap"
          } gap-5`}
        >
          {data &&
            data.data.microsites.map((microsite: any) => (
              <SelectSmartsiteCart
                key={microsite._id}
                microsite={microsite}
                lengthOfMicrosites={data.data.microsites.length}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default selectSmartsitePage;
