import Image from "next/image";
import React, { useEffect } from "react";
import swop from "@/public/images/live-preview/swop.svg";
import { BiSolidEdit } from "react-icons/bi";
import useSmartsiteFormStore from "@/zustandStore/EditSmartsiteInfo";
import isUrl from "@/util/isUrl";
// import useUpdateSmartIcon from "@/zustandStore/UpdateSmartIcon";
// import useSmallIconToggleStore from "@/zustandStore/SmallIconModalToggle";
// import useSideBarToggleStore from "@/zustandStore/SideBarToggleStore";

const SmartsiteLivePreview = () => {
  //   const setSmartSiteData = useUpdateSmartIcon((state: any) => state.setState);
  //   const { toggle } = useSideBarToggleStore();

  // console.log("data form live", data);
  const { formData, setFormData }: any = useSmartsiteFormStore();
  //   const { setOn }: any = useSmallIconToggleStore();

  //   const handleTriggerUpdate = (data: {
  //     data: any;
  //     categoryForTrigger: string;
  //   }) => {
  //     setSmartSiteData(data);
  //     setOn(true);
  //   };

  // console.log("audio", data.info.audio);

  // console.log("formdata", formData);
  // console.log("data", data);

  useEffect(() => {
    setFormData("theme", false);
    setFormData("backgroundImg", "8");
  }, [setFormData]);

  return (
    <section
      style={{
        backgroundImage:
          formData.theme &&
          `url(/images/smartsite-background/${formData.backgroundImg}.png)`,
        height: "90%",
      }}
      className="w-[38%] overflow-y-auto shadow-md bg-white bg-cover"
    >
      {/* <p className="text-sm text-gray-500 mb-2">Preview</p> */}
      <div className={``}>
        <div className="relative">
          {!formData.theme && (
            <>
              {formData.backgroundImg && (
                <>
                  <div className="bg-white p-2 rounded-xl shadow-md">
                    <Image
                      alt="banner image"
                      src={`/images/smartsite-banner/${formData.backgroundImg}.png`}
                      width={800}
                      height={400}
                      className="rounded-xl w-full h-auto"
                    />
                  </div>
                </>
              )}
            </>
          )}

          <div
            className={`${
              !formData.theme
                ? "absolute top-full -translate-y-1/2 left-1/2 -translate-x-1/2"
                : "flex justify-center pt-24"
            } `}
          >
            {formData.galleryImg ? (
              <>
                <Image
                  alt="user image"
                  src={formData.galleryImg}
                  width={140}
                  height={140}
                  className="rounded-full w-28 xl:w-36 2xl:w-44 h-28 xl:h-36 2xl:h-44 p-1 bg-white shadow-medium"
                />
              </>
            ) : (
              <>
                {formData.profileImg ? (
                  <>
                    {isUrl(formData.profileImg) ? (
                      <Image
                        alt="user image"
                        src={formData.galleryImg}
                        width={140}
                        height={140}
                        className="rounded-full w-28 xl:w-36 2xl:w-44 h-28 xl:h-36 2xl:h-44 p-1 bg-white shadow-medium"
                      />
                    ) : (
                      <Image
                        alt="user image"
                        src={`/images/user_avator/${formData.profileImg}.png`}
                        width={140}
                        height={140}
                        className="rounded-full w-28 xl:w-36 2xl:w-44 h-auto p-1 bg-white shadow-medium border-2 border-gray-200"
                      />
                    )}
                  </>
                ) : (
                  <Image
                    alt="user image"
                    src={`/images/user_avator/1.png`}
                    width={140}
                    height={140}
                    className="rounded-full w-28 xl:w-36 2xl:w-44 h-auto p-1 bg-white shadow-medium border-2 border-gray-200"
                  />
                )}
              </>
            )}
          </div>
        </div>
        <div
          className={`${
            !formData.theme && "mt-[4.5rem] xl:mt-20 2xl:mt-28"
          }  flex flex-col gap-6 mt-6`}
        >
          <div className="flex flex-col items-center">
            <p className="text-lg font-bold text-gray-700">
              {formData.name ? formData.name : "Example Name"}
            </p>
            <p className="text-gray-500 font-medium text-sm">
              {formData.bio ? formData.bio : "Example Bio"}
            </p>
          </div>
          {/* embed link display here end */}
          {/* <div className="flex items-center justify-center gap-2 pb-6 pt-2">
            <Image alt="swop logo" src={swop} />
            <BiSolidEdit />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default SmartsiteLivePreview;
