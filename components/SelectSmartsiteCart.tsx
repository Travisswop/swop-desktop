"use client";
import isUrl from "@/util/isUrl";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SelectSmartsiteCart = ({ microsite, lengthOfMicrosites }: any) => {
  const router = useRouter();

  // const [loading, setLoading] = useState(false);

  const setSelectedSmartsite = (id: string) => {
    localStorage.setItem("selected smartsite", id);
    router.push("/");
  };

  // console.log("lengthOfMicrosites", lengthOfMicrosites);

  // useEffect(() => {
  //   if (lengthOfMicrosites < 2) {
  //     setLoading(true);
  //     localStorage.setItem("selected smartsite", microsite._id);
  //     setTimeout(() => {
  //       setLoading(false);
  //       // router.push("/");
  //     }, 10000);
  //   }
  // }, [lengthOfMicrosites, microsite._id, router]);

  // useEffect(() => {
  //   window.location.reload();
  // }, []);

  return (
    <div>
      {/* {loading && (
        <p className="flex items-center justify-center gap-1 mt-2">
          Redirecting to homepage <Spinner size="sm" />{" "}
        </p>
      )} */}

      <div
        className="bg-white p-4 rounded-xl shadow-medium hover:scale-105 transition-all ease-in-out cursor-pointer flex flex-col gap-3 items-center min-w-60 h-full"
        onClick={() => setSelectedSmartsite(microsite._id)}
      >
        <div>
          <Image
            alt="user image"
            src={
              isUrl(microsite.profilePic)
                ? microsite.profilePic
                : `/images/user_avator/${microsite.profilePic}.png`
            }
            width={300}
            height={300}
            className="rounded-full w-24 h-24"
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-700">
              {microsite.name}
            </h3>
            <p className="font-medium text-gray-500">{microsite.bio}</p>
            <p className="font-medium text-gray-500 text-sm mt-2">
              ENS Name: {microsite?.ens ? microsite?.ens : "N/A"}
            </p>
            <p className="font-medium text-gray-500 text-sm">
              Wallet Address:{" "}
              {microsite?.ethAddress
                ? `${microsite?.ethAddress.slice(0, 20)}...`
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectSmartsiteCart;
