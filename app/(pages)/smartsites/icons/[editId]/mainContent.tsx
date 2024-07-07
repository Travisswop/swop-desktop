"use client";
import DynamicPrimaryBtn from "@/components/Button/DynamicPrimaryBtn";
import EditMicrositeBtn from "@/components/Button/EditMicrositeBtn";
import AddIcon from "@/components/EditMicrosite/AddIcon";
import IconMaker from "@/components/EditMicrosite/IconMaker";
import UpdateSmallIcon from "@/components/EditMicrosite/UpdateSmallIcon";
import UpdateAppIcon from "@/components/EditMicrosite/appIcon/UpdateAppIcon";
import UpdateBlog from "@/components/EditMicrosite/blog/UpdateBlog";
import ViewBlog from "@/components/EditMicrosite/blog/ViewBlog";
import UpdateContactCard from "@/components/EditMicrosite/contactCard/UpdateContactCard";
import UpdateEmbed from "@/components/EditMicrosite/embed/UpdateEmbed";
import UpdateInfoBar from "@/components/EditMicrosite/infoBar/UpdateInfoBar";
import LivePreview from "@/components/LivePreview";
import useLoggedInUserStore from "@/zustandStore/SetLogedInUserSession";
import useSmallIconToggleStore from "@/zustandStore/SmallIconModalToggle";
import useUpdateSmartIcon from "@/zustandStore/UpdateSmartIcon";
import useSmartSiteApiDataStore from "@/zustandStore/UpdateSmartsiteInfo";
import { Switch } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsSend } from "react-icons/bs";
import { LiaFileMedicalSolid } from "react-icons/lia";

const MicrositeEditMainContentPage = ({ session, data }: any) => {
  const [toggleIcon, setToggleIcon] = useState<any>([]);
  // const [triggerUpdateSmallIcon, setTriggerUpdateSmallIcon] = useState<any>("");
  // const [open, setOpen] = useState(false);

  const setSmartSiteData = useSmartSiteApiDataStore(
    (state: any) => state.setSmartSiteData
  ); //get setter for setting smartsite info from zustand store

  const setLoggedInUserInfo = useLoggedInUserStore(
    (state: any) => state.setState
  ); //get setter for setting session info from zustand store

  const { isOn, setOff }: any = useSmallIconToggleStore();

  const iconData: any = useUpdateSmartIcon(); //get trigger smarticon from zustand store

  console.log("iconData", iconData);

  const handleAddIcon = (title: { title: string }) => {
    setToggleIcon([...toggleIcon, title]);
  };
  const handleRemoveIcon = (title: { title: string }) => {
    // console.log("title", title);
    const filteredIcon = toggleIcon.filter((data: any) => data != title);
    // console.log("filteredIcon", filteredIcon);

    setToggleIcon(filteredIcon);
  };

  //set smartsite info into zustand store
  //set session info into zustand store
  useEffect(() => {
    if (data) {
      setSmartSiteData(data);
    }
    if (session) {
      setLoggedInUserInfo(session);
    }
    // if (iconData) {
    //   setOpen(true);
    // }
  }, [data, session, iconData, setLoggedInUserInfo, setSmartSiteData]);

  // console.log("open", open);

  return (
    <main className="main-container overflow-hidden">
      <div className="flex gap-6 items-start">
        <div className="w-[62%] relative border-r border-gray-200 pr-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h5 className="heading-3">Microsite Builder</h5>
            <EditMicrositeBtn>
              <BsSend /> Share
            </EditMicrositeBtn>
          </div>
          <IconMaker
            handleAddIcon={handleAddIcon}
            handleRemoveIcon={handleRemoveIcon}
            toggleIcon={toggleIcon}
          />
          <div className="flex items-center justify-center gap-2">
            <EditMicrositeBtn>
              <LiaFileMedicalSolid size={20} />
              Customize QR
            </EditMicrositeBtn>
            <EditMicrositeBtn>
              <LiaFileMedicalSolid size={20} />
              Edit Background
            </EditMicrositeBtn>
            <Link href={`/smartsites/travis-herron`}>
              <EditMicrositeBtn>
                <LiaFileMedicalSolid size={20} />
                Microsite Settings
              </EditMicrositeBtn>
            </Link>
          </div>
          <DynamicPrimaryBtn className="w-full !rounded-full mt-2">
            <LiaFileMedicalSolid size={20} /> Publish
          </DynamicPrimaryBtn>
          <div className="flex items-center gap-8 border border-gray-300 rounded-xl pl-4 pr-3 py-2 text-lg font-medium text-gray-600 w-max">
            <p>Lead Capture</p>
            <Switch
              color="default"
              size="sm"
              defaultSelected
              aria-label="Lead Captures"
            />
          </div>

          {/* small icon start  */}
          {isOn && iconData && iconData?.categoryForTrigger === "socialTop" && (
            <UpdateSmallIcon
              iconDataObj={iconData}
              isOn={isOn}
              setOff={setOff}
            />
          )}
          {/* small icon end   */}

          {/* app icon start  */}
          {isOn &&
            iconData &&
            iconData?.categoryForTrigger === "socialLarge" && (
              <UpdateAppIcon
                iconDataObj={iconData}
                isOn={isOn}
                setOff={setOff}
              />
            )}
          {/* app icon end   */}

          {/* contact card start  */}
          {isOn &&
            iconData &&
            iconData?.categoryForTrigger === "contactCard" && (
              <UpdateContactCard
                iconDataObj={iconData}
                isOn={isOn}
                setOff={setOff}
              />
            )}
          {/* contact card end   */}

          {/* embed start  */}
          {isOn && iconData && iconData?.categoryForTrigger === "embed" && (
            <UpdateEmbed iconDataObj={iconData} isOn={isOn} setOff={setOff} />
          )}
          {/* embed end   */}

          {/* update info bar start  */}
          {isOn && iconData && iconData?.categoryForTrigger === "infoBar" && (
            <UpdateInfoBar iconDataObj={iconData} isOn={isOn} setOff={setOff} />
          )}
          {/* update info bar end   */}

          {/* update blog start  */}
          {isOn && iconData && iconData?.categoryForTrigger === "blog" && (
            <UpdateBlog iconDataObj={iconData} isOn={isOn} setOff={setOff} />
          )}
          {/* update blog end   */}

          {/* show blog details start  */}
          {isOn && iconData && iconData?.categoryForTrigger === "showBlog" && (
            <ViewBlog iconDataObj={iconData} isOn={isOn} setOff={setOff} />
          )}
          {/* show blog details end   */}

          {toggleIcon.map((info: any, index: number) => (
            <AddIcon key={index} data={info} />
          ))}
        </div>
        <div className="w-[38%]">
          <LivePreview data={data.data} />
        </div>
      </div>
    </main>
  );
};

export default MicrositeEditMainContentPage;
