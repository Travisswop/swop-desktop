"use client";
import React, { useState } from "react";
import MainButton from "./MainButton";
import { MdOutlineQrCode } from "react-icons/md";
import Image from "next/image";
import qrcode from "@/public/images/websites/qrcode.png";
import edit from "@/public/images/websites/icon/edit.svg";
import send from "@/public/images/websites/icon/send.svg";
import qrJson1 from "@/util/data/qr-code-json/1-A.json";
import { postUserCustomQrCode } from "@/actions/customQrCode";
import { toast } from "react-toastify";
import Link from "next/link";
import ShareQrCodeModal from "./modal/ShareQrCodeModal";
import { QrCode1 } from "@/util/data/qr-code-svg-data/QRData";
import { FiDownload } from "react-icons/fi";

const CreateQRCodeFromHome = ({ session }: any) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCreateQrCode = async (e: any) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      let qrData = { ...qrJson1 };

      const formData = new FormData(e.currentTarget);

      const payload = {
        userId: session._id,
        customQrData: qrData,
        qrCodeName: formData.get("title"),
        data: formData.get("url"),
        qrCodeSvgName: "QrCode1",
      };

      qrData.dotsOptions = { ...qrData.dotsOptions, color: "#000000" };

      qrData.cornersDotOptions = {
        ...qrData.cornersDotOptions,
        color: "#000000",
      };
      qrData.cornersSquareOptions = {
        ...qrData.cornersSquareOptions,
        color: "#000000",
      };

      // Send the updated JSON data in a POST request
      const data: any = await postUserCustomQrCode(
        payload,
        session.accessToken
      );

      //   console.log("create data ", data);

      if (data && data.status === "success") {
        setData(data);
        toast.success("Qr code created");
        setIsLoading(false);
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

  //   console.log("data from qr", data);

  const handleOpenShareModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg mt-6 p-6">
        <h5 className="text-lg text-gray-700 font-semibold mb-1">
          Create QR Code
        </h5>
        <div>
          <div className="flex gap-6 items-center justify-between">
            <form onSubmit={handleCreateQrCode} className="w-full">
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  required
                  className="w-full bg-gray-200 py-2.5 rounded-full px-4 focus:outline-none"
                />

                <input
                  type="url"
                  placeholder="URL"
                  name="url"
                  required
                  className="w-full bg-gray-200 py-2.5 rounded-full px-4 focus:outline-none"
                />
              </div>
              <div className="flex justify-center w-full mt-4">
                <MainButton
                  loading={isLoading}
                  title={"Generate QR"}
                  icon={<MdOutlineQrCode />}
                  className={"w-44"}
                />
              </div>
            </form>
            {data ? (
              <div>
                <Image
                  alt="qr code"
                  src={data?.data?.qrCodeUrl ? data.data.qrCodeUrl : qrcode}
                  width={200}
                  height={200}
                  className="border-2 border-gray-600 rounded-2xl"
                />
                <div className="flex items-center gap-2 justify-center mt-2">
                  <Link
                    href={data?.data?._id ? `/qr-code/${data.data._id}` : ""}
                  >
                    <button type="button" className="bg-black p-2 rounded-lg">
                      <Image alt="edit" src={edit} width={16} />
                    </button>
                  </Link>
                  <button
                    type="button"
                    onClick={handleOpenShareModal}
                    className="bg-black p-2 rounded-lg"
                  >
                    <Image alt="send" src={send} width={16} />
                  </button>
                  <a
                    href={data.data.qrCodeUrl}
                    download="qrcode.png"
                    className="bg-black p-1.5 rounded-lg"
                  >
                    <FiDownload color="white" size={18} />
                  </a>
                </div>
              </div>
            ) : (
              // <div className="w-36 h-36 rounded border flex items-center justify-center text-center px-1">
              //   <p className="text-xs font-medium text-gray-400">
              //     create a qr code to preview
              //   </p>
              // </div>
              <div className="border-2 border-gray-500 rounded-xl p-2 pb-4">
                <div className="relative w-[130px] h-[130px]">
                  <QrCode1 color={"black"} width={130} height={130} />
                  <Image
                    alt="swop-logo"
                    src={
                      "https://res.cloudinary.com/bayshore/image/upload/v1725968507/qr-logo_mwasoz_imt0ql.png"
                    }
                    width={90}
                    height={90}
                    className="absolute inset-0 m-auto w-8 h-8"
                  />
                  <p className="text-[8px] text-center">Powered By SWOP</p>
                </div>

                {/* <div className='flex items-center gap-3 justify-center mt-4'>
                  <Link href={``}>
                    <button className='bg-black p-2.5 rounded-lg hover:bg-slate-800'>
                      <Image
                        alt='edit'
                        src={'/images/homepage/edit.png'}
                        width={18}
                        height={18}
                      />
                    </button>
                  </Link>
                  <button
                    // onClick={() =>
                    //   handleOpenSmartSiteProfileShareModal(microsite.profileUrl)
                    // }
                    className='bg-black p-2.5 rounded-lg hover:bg-slate-800'
                  >
                    <Image
                      alt='send'
                      src={'/images/homepage/send.png'}
                      width={18}
                      height={18}
                    />
                  </button>
                  <button
                    // onClick={() =>
                    //   handleOpenSmartSiteProfileShareModal(
                    //     microsite.profileUrl,
                    //   )
                    // }
                    className='bg-black p-2.5 rounded-lg hover:bg-slate-800'
                  >
                    <Image
                      alt='qr'
                      src={'/images/homepage/qr.png'}
                      width={18}
                      height={18}
                    />
                  </button>
                </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ShareQrCodeModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          qrCodeUrl={data.data.qrCodeUrl}
        />
      )}
    </>
  );
};

export default CreateQRCodeFromHome;
