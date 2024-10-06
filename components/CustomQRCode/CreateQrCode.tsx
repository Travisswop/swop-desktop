"use client";
import DynamicPrimaryBtn from "@/components/Button/DynamicPrimaryBtn";
import { Switch } from "@nextui-org/react";

// import EditMicrositeBtn from "@/components/Button/EditMicrositeBtn";
// import QRCodeShareModal from "@/components/ShareModal/QRCodeShareModal";
import { Spinner } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { MdAttachFile } from "react-icons/md";
import { MdQrCode2 } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";

// import { FiSend } from "react-icons/fi";
import {
  QrCode1,
  QrCode2,
  QrCode3,
  QrCode4,
} from "@/util/data/qr-code-svg-data/QRData";
import qrJson1 from "@/util/data/qr-code-json/1-A.json";
import qrJson2 from "@/util/data/qr-code-json/2-A.json";
import qrJson3 from "@/util/data/qr-code-json/3-A.json";
import qrJson4 from "@/util/data/qr-code-json/4-A.json";
import { FaSave } from "react-icons/fa";
import { sendCloudinaryImage } from "@/util/SendCloudineryImage";
import CustomFileInput from "../CustomFileInput";
import { toast } from "react-toastify";
import { postCustomQrCode, postUserCustomQrCode } from "@/actions/customQrCode";
import { IoMdLink } from "react-icons/io";
import { useRouter } from "next/navigation";

const CreateQRCode = ({ session }: any) => {
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [qrCodeShape, setqrCodeShape] = useState("round");
  const [qrCodeFrame, setqrCodeFrame] = useState("square");
  const [selectQrCodeSocialLink, setSelectQrCodeSocialLink] =
    useState("www.swopme.co");

  const [uploadImageFileName, setUploadImageFileName] = useState("");
  const [toggle, setToggle] = useState(false);
  const [backgroundColorToggle, setBackgroundColorToggle] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<any>(null);
  const [fileError, setFileError] = useState<string>("");
  const pickerRef = useRef<HTMLDivElement>(null);
  const backgroundPickerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const [qrPattern, setQrPattern] = useState("QrCode1");

  const defaultColorArray = [
    {
      _id: "1234",
      hexCode: "#000000",
    },
    {
      _id: "11234",
      hexCode: "#E6379A",
    },
    {
      _id: "12534",
      hexCode: "#6F2FC0",
    },
    {
      _id: "12314",
      hexCode: "#FF6C08",
    },
    {
      _id: "15234",
      hexCode: "#FF9500",
    },
    {
      _id: "12334",
      hexCode: "#6B6B6B",
    },
    {
      _id: "12324",
      hexCode: "#BF0000",
    },
    {
      _id: "12344",
      hexCode: "#027AFF",
    },
  ];

  const defaultShapeArray = [
    {
      _id: "1",
      shapeUrl: "/images/qr-code/circle.png",
      shapeTitle: "circle",
    },
    {
      _id: "2",
      shapeUrl: "/images/qr-code/square.png",
      shapeTitle: "square",
    },
    {
      _id: "3",
      shapeUrl: "/images/qr-code/round.png",
      shapeTitle: "round",
    },
  ];

  const defaultFrameArray = [
    {
      _id: "1",
      frameUrl: "/images/qr-code/circle.png",
      frameTitle: "circle",
    },
    {
      _id: "2",
      frameUrl: "/images/qr-code/square.png",
      frameTitle: "square",
    },
  ];

  const defaultSocialLinkArray = [
    {
      _id: "1",
      socialIcon: "/images/qr-code/social-icon/link.png",
      socialTitle: "link",
      socialUrl: "www.swopme.co",
    },
    {
      _id: "2",
      socialIcon: "/images/qr-code/social-icon/search.png",
      socialTitle: "google",
      socialUrl: "www.google.com",
    },
    {
      _id: "3",
      socialIcon: "/images/qr-code/social-icon/youtube.png",
      socialTitle: "youtube",
      socialUrl: "www.youtube.com",
    },
    {
      _id: "4",
      socialIcon: "/images/qr-code/social-icon/instagram.png",
      socialTitle: "instagram",
      socialUrl: "www.instagram.com",
    },
    {
      _id: "5",
      socialIcon: "/images/qr-code/social-icon/linkedin.png",
      socialTitle: "linkedin",
      socialUrl: "www.linkedin.com",
    },
    {
      _id: "6",
      socialIcon: "/images/qr-code/social-icon/tik-tok.png",
      socialTitle: "tik-tok",
      socialUrl: "www.tiktok.com",
    },
    {
      _id: "7",
      socialIcon: "/images/qr-code/social-icon/snapchat.png",
      socialTitle: "snapchat",
      socialUrl: "www.snapchat.com",
    },
    {
      _id: "8",
      socialIcon: "/images/qr-code/social-icon/twitter.png",
      socialTitle: "twitter",
      socialUrl: "www.x.com",
    },
    {
      _id: "9",
      socialIcon: "/images/qr-code/social-icon/spotify.png",
      socialTitle: "spotify",
      socialUrl: "www.spotify.com",
    },
  ];

  // const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // const handleModal = () => {
  //   onOpen();
  //   setIsModalOpen(true);
  // };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // Check if file size is greater than 10 MB
        setFileError("*File size must be less than 10 MB");
        setImageFile(null);
      } else {
        setUploadImageFileName(file.name);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageFile(reader.result as any);
          setFileError("");
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    let qrData;
    switch (qrPattern) {
      case "QrCode1":
        qrData = { ...qrJson1 };
        break;
      case "QrCode2":
        qrData = { ...qrJson2 };
        break;
      case "QrCode3":
        qrData = { ...qrJson3 };
        break;
      case "QrCode4":
        qrData = { ...qrJson4 };
        break;
      default:
        qrData = { ...qrJson1 };
    }

    // Update the JSON data with current state values
    // qrData.dotsOptions.color = color;
    // qrData.backgroundOptions.color = bgColor || "#ffffff00";

    //userId, customQrData, qrCodeName, data, qrCodeSvgName

    try {
      const payload = {
        userId: session._id,
        customQrData: qrData,
        qrCodeName: formData.get("title"),
        data: selectQrCodeSocialLink,
        qrCodeSvgName: qrPattern,
      };

      // console.log("paoodf", payload);
      // console.log("color", color);

      if (imageFile) {
        const imageUrl = await sendCloudinaryImage(imageFile);
        // console.log("imageUrl", imageUrl);

        qrData.image = imageUrl;
      }

      qrData.backgroundOptions = { color: bgColor };
      qrData.dotsOptions = { ...qrData.dotsOptions, color: color };
      //   qrData.data = profileUrl;
      // corner dot color
      qrData.cornersDotOptions = {
        ...qrData.cornersDotOptions,
        color: color,
      };
      qrData.cornersSquareOptions = {
        ...qrData.cornersSquareOptions,
        color: color,
      };

      // console.log("payload", payload);

      // Send the updated JSON data in a POST request
      const data: any = await postUserCustomQrCode(
        payload,
        session.accessToken
      );

      // console.log("create data ", data);

      if (data && data.status === "success") {
        toast.success("Qr code created");
        setIsLoading(false);
        router.push("/qr-code");
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      toast.error("something went wrong");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setToggle(false);
      }
    };

    // Add event listener to detect clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup event listener when component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        backgroundPickerRef.current &&
        !backgroundPickerRef.current.contains(event.target as Node)
      ) {
        setBackgroundColorToggle(false);
      }
    };

    // Add event listener to detect clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup event listener when component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main className="main-container overflow-hidden">
      <div className="flex gap-6 items-start">
        <div className="w-[62%] border-r border-gray-300 pr-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-gray-700">Customize QR</p>
          </div>
          <form
            onSubmit={handleFormSubmit}
            className="bg-white py-6 px-10 flex flex-col gap-4"
          >
            {/* Your Title */}
            <div className="">
              <label htmlFor="title" className="heading-4 block mb-2">
                Your QR Name{" "}
              </label>
              <div className="flex-1">
                <input
                  required
                  type="text"
                  placeholder={`Enter qr name`}
                  id="title"
                  name="title"
                  className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-lg focus:outline-none px-4 py-2.5 text-gray-700 bg-gray-100 pl-4"
                />
              </div>
            </div>
            {/* I want my QR code to scan to */}
            <div className="">
              <label htmlFor="name" className="heading-4 block mb-2">
                I want my QR code to scan to:{" "}
              </label>
              <div className="flex items-center gap-x-2 mb-2">
                {defaultSocialLinkArray.map((data) => (
                  <div
                    className={`p-2 border-2 cursor-pointer ${
                      data.socialUrl === selectQrCodeSocialLink
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                    key={data._id}
                    onClick={() => setSelectQrCodeSocialLink(data.socialUrl)}
                  >
                    <Image
                      src={data.socialIcon}
                      alt={data.socialTitle}
                      width={30}
                      height={30}
                      className="w-6 h-6"
                    />
                  </div>
                ))}
              </div>

              <div className="relative flex-1">
                <IoMdLink
                  className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
                  size={18}
                />
                <input
                  type="text"
                  placeholder={selectQrCodeSocialLink}
                  id="url"
                  name="url"
                  // defaultValue={selectQrCodeSocialLink}
                  value={selectQrCodeSocialLink}
                  onChange={(e) => setSelectQrCodeSocialLink(e.target.value)}
                  className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-lg focus:outline-none px-4 py-2.5 text-gray-700 bg-gray-100 pl-10"
                />
              </div>
            </div>
            <div>
              <p className="heading-4 mb-2">Choose A Pattern: </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className={`w-12 h-12 overflow-hidden rounded-lg ${
                    qrPattern === "QrCode1"
                      ? "bg-black border-2 border-black"
                      : "bg-white"
                  }`}
                  onClick={() => setQrPattern("QrCode1")}
                >
                  <QrCode1
                    height={100}
                    width={100}
                    color={qrPattern === "QrCode1" ? "white" : "black"}
                    className={"-translate-x-[54px] -translate-y-[54px]"}
                  />
                </button>

                <button
                  type="button"
                  className={`w-12 h-12 overflow-hidden rounded-lg ${
                    qrPattern === "QrCode2"
                      ? "bg-black border-2 border-black"
                      : "bg-white"
                  }`}
                  onClick={() => setQrPattern("QrCode2")}
                >
                  <QrCode2
                    height={100}
                    width={100}
                    color={qrPattern === "QrCode2" ? "white" : "black"}
                    className={"-translate-x-[54px] -translate-y-[54px]"}
                  />
                </button>

                <button
                  type="button"
                  className={`w-12 h-12 overflow-hidden rounded-lg ${
                    qrPattern === "QrCode3"
                      ? "bg-black border-2 border-black"
                      : "bg-white"
                  }`}
                  onClick={() => setQrPattern("QrCode3")}
                >
                  <QrCode3
                    height={100}
                    width={100}
                    color={qrPattern === "QrCode3" ? "white" : "black"}
                    className={"-translate-x-[54px] -translate-y-[54px]"}
                  />
                </button>
                <button
                  type="button"
                  className={`w-12 h-12 overflow-hidden rounded-lg ${
                    qrPattern === "QrCode4"
                      ? "bg-black border-2 border-black"
                      : "bg-white"
                  }`}
                  onClick={() => setQrPattern("QrCode4")}
                >
                  <QrCode4
                    height={100}
                    width={100}
                    color={qrPattern === "QrCode4" ? "white" : "black"}
                    className={"-translate-x-[54px] -translate-y-[54px]"}
                  />
                </button>
              </div>
            </div>
            <div>
              <p className="heading-4 mb-2">Pick QR Color: </p>
              <div className="flex items-center gap-3 bg-gray-100 p-2 rounded-lg">
                <button type="button" onClick={() => setToggle(true)}>
                  <Image
                    alt="pick color"
                    src={"/images/color.png"}
                    width={40}
                    height={40}
                  />
                </button>
                <p className="text-gray-400">
                  {!color || color === "#NaNNaNNaN" ? "#HEX" : color}
                </p>
              </div>
              <div ref={pickerRef} className="w-max">
                {toggle && <HexColorPicker color={color} onChange={setColor} />}
              </div>
            </div>
            <div>
              <p className="heading-4 mb-2">Default QR Colors: </p>
              <div className="flex items-center gap-3">
                {defaultColorArray.map((data) => (
                  <button
                    type="button"
                    key={data._id}
                    onClick={() => setColor(data.hexCode)}
                    className={`rounded-full ${
                      color === data.hexCode && "border-2 border-[#027AFF] p-1"
                    } `}
                  >
                    <div
                      style={{ backgroundColor: data.hexCode }}
                      className={`w-11 h-11 rounded-full`}
                    ></div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="heading-4 mb-2">Choose Background Color: </p>
              <div className="flex items-center gap-3 bg-gray-100 p-2 rounded-lg">
                <button
                  type="button"
                  onClick={() => setBackgroundColorToggle(true)}
                >
                  <Image
                    alt="pick color"
                    src={"/images/color.png"}
                    width={40}
                    height={40}
                  />
                </button>
                <p className="text-gray-400">
                  {!bgColor || bgColor === "#NaNNaNNaN" ? "#HEX" : bgColor}
                </p>
              </div>
              <div className="w-max" ref={backgroundPickerRef}>
                {backgroundColorToggle && (
                  <HexColorPicker color={bgColor} onChange={setBgColor} />
                )}
              </div>
            </div>
            <div>
              <p className="heading-4 mb-2">Default Background Colors: </p>
              <div className="flex items-center gap-3">
                {defaultColorArray.map((data) => (
                  <button
                    type="button"
                    key={data._id}
                    onClick={() => setBgColor(data.hexCode)}
                    className={`rounded-full ${
                      bgColor === data.hexCode &&
                      "border-2 border-[#027AFF] p-1"
                    } `}
                  >
                    <div
                      style={{ backgroundColor: data.hexCode }}
                      className={`w-11 h-11 rounded-full`}
                    ></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Choose Shape */}
            <div className="">
              <p className="heading-4 mb-2">Choose Shape:</p>
              <div className="flex items-center gap-3">
                {defaultShapeArray.map((data) => (
                  <div
                    className={`p-2.5 border-2 rounded-full cursor-pointer ${
                      data.shapeTitle === qrCodeShape
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                    key={data._id}
                    onClick={() => setqrCodeShape(data.shapeTitle)}
                  >
                    <Image
                      src={data.shapeUrl}
                      alt={data.shapeTitle}
                      width={30}
                      height={30}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Choose Frame */}
            <div className="">
              <p className="heading-4 mb-2">Choose Frame:</p>
              <div className="flex items-center gap-3">
                {defaultFrameArray.map((data) => (
                  <div
                    className={`p-2.5 border-2 rounded-full cursor-pointer ${
                      data.frameTitle === qrCodeFrame
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                    key={data._id}
                    onClick={() => setqrCodeFrame(data.frameTitle)}
                  >
                    <Image
                      src={data.frameUrl}
                      alt={data.frameTitle}
                      width={30}
                      height={30}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Edit Logo */}
            <div className="">
              <label htmlFor="name" className="heading-4 mb-2">
                Edit Logo:{" "}
              </label>
              <div>
                <div className="flex items-center w-full border-2 border-[#ede8e8] focus-within:border-[#e5e0e0] rounded-lg bg-white px-4 py-1">
                  {/* Icon at the start */}
                  <span className="text-gray-500 pr-2">
                    <MdAttachFile />
                  </span>

                  {/* Input field */}
                  <input
                    type="text"
                    placeholder={uploadImageFileName}
                    id="title"
                    name="title"
                    className="w-full bg-transparent border-none focus:outline-none text-gray-700"
                  />

                  {/* CustomFileInput component at the end */}
                  <CustomFileInput handleFileChange={handleFileChange} />
                </div>

                {/* {fileError && (
                  <p className='text-red-600 text-sm font-medium'>
                    {fileError}
                  </p>
                )} */}
              </div>
            </div>

            {/* QR Code Branding */}
            <div className="">
              <div className="flex items-center gap-x-2 mb-2">
                <label htmlFor="name" className="heading-4">
                  QR Code Branding:
                </label>
                <div className="border border-black p-0.5 rounded-full">
                  <MdQrCode2 className="size-3 rounded-full text-black" />
                </div>
                <div className="bg-black rounded-full text-white p-1 flex items-center gap-x-1 px-2 ml-2">
                  <MdLockOutline className="size-3" />
                  <p className="text-xs">Pro</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p>I want to remove the Swop Logo:</p>
                <Switch
                  defaultSelected
                  aria-label="Automatic updates"
                  color="primary"
                />
              </div>
            </div>
            <div>
              <DynamicPrimaryBtn disabled={isLoading} className="mt-3 w-48">
                {isLoading ? (
                  <Spinner className="py-0.5" size="sm" color="white" />
                ) : (
                  <>
                    {" "}
                    <FaSave size={18} />
                    Save Changes
                  </>
                )}
              </DynamicPrimaryBtn>
            </div>
          </form>
        </div>

        {/* live preview  */}
        <div className="w-[38%] flex flex-col items-center gap-4">
          <p className="text-gray-500 font-medium mb-2">Live Preview</p>
          <div className="bg-white p-2.5 rounded-xl shadow-medium">
            <div
              style={{ backgroundColor: bgColor }}
              className={`relative p-2 rounded-lg`}
            >
              {qrPattern === "QrCode1" && (
                <QrCode1 width={200} height={200} color={color} />
              )}
              {qrPattern === "QrCode2" && (
                <QrCode2 width={200} height={200} color={color} />
              )}
              {qrPattern === "QrCode3" && (
                <QrCode3 width={200} height={200} color={color} />
              )}
              {qrPattern === "QrCode4" && (
                <QrCode4 width={200} height={200} color={color} />
              )}

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {imageFile ? (
                  <Image
                    src={imageFile}
                    quality={100}
                    alt="logo"
                    width={200}
                    height={200}
                    className="w-12 h-12"
                  />
                ) : (
                  <Image
                    src={
                      "https://res.cloudinary.com/bayshore/image/upload/v1725968507/qr-logo_mwasoz_imt0ql.png"
                    }
                    quality={100}
                    alt="logo"
                    width={200}
                    height={200}
                    className="w-12 h-12"
                  />
                )}
              </div>
            </div>
          </div>
          {/* <p className="heading-4 mt-4">Select Download Type</p>
          <div>
            <RadioGroup value="PDF" orientation="horizontal" color="success">
              <Radio value="PDF">PDF</Radio>
              <Radio value="JPG">JPG</Radio>
              <Radio value="PNG">PNG</Radio>
              <Radio value="SVG">SVG</Radio>
            </RadioGroup>
          </div>
          <DynamicPrimaryBtn>
            <MdOutlineFileUpload size={18} />
            Download
          </DynamicPrimaryBtn> */}
        </div>
      </div>
      {/* <QRCodeShareModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        // bannerImgArr={bannerImgArr}
        // backgroundImgArr={backgroundImgArr}
        // onSelectImage={handleSelectImage}
        setIsModalOpen={setIsModalOpen}
        // handleFileChange={handleFileChange}
      /> */}
    </main>
  );
};

export default CreateQRCode;
