"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CiSettings } from "react-icons/ci";
import Image from "next/image";
import travisImg from "@/public/images/websites/travis-image.png";
import bgImg from "@/public/images/websites/background-image.png";
import edit from "@/public/images/websites/icon/edit.svg";
import barcode from "@/public/images/websites/icon/scan-barcode.svg";
import send from "@/public/images/websites/icon/send.svg";
import wallet from "@/public/images/websites/icon/wallet.svg";
import qrcode from "@/public/images/websites/qrcode.png";
import { LiaFileMedicalSolid } from "react-icons/lia";

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        marginRight: 50,
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        marginLeft: 50,
      }}
      onClick={onClick}
    />
  );
}

const Microsite = () => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const handleOnClick = () => {
    console.log("clicked");
  };

  return (
    <div className="w-full">
      <div className="slider-container">
        <Slider {...settings} className="">
          <div className="py-8 px-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl text-gray-700 font-bold">Websites</h3>
              <button className="border border-gray-500 rounded-lg px-4 py-2 flex items-center gap-1 font-medium">
                <CiSettings size={20} />
                Manage Sites
              </button>
            </div>
            <div className="shadow-medium rounded-2xl my-6 mx-10 pt-3 pb-8">
              <div>
                <div className="relative px-6">
                  <Image
                    alt="background image"
                    src={bgImg}
                    quality={100}
                    className="w-full"
                  />
                  <Image
                    alt="travis image"
                    src={travisImg}
                    width={130}
                    className="absolute -translate-y-24 left-1/2 -translate-x-[50%]"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center pt-10">
                <h2 className="text-xl font-bold">Travis Herron</h2>
                <p className="text-gray-500 font-medium">
                  Founder & CEO at SWOP
                </p>
              </div>
              <div className="flex items-center gap-4 justify-center mt-6">
                <button className="bg-black p-3 rounded-lg">
                  <Image alt="edit" src={edit} width={20} />
                </button>
                <button className="bg-black p-3 rounded-lg">
                  <Image alt="barcode" src={barcode} width={20} />
                </button>
                <button className="bg-black p-3 rounded-lg">
                  <Image alt="send" src={send} width={20} />
                </button>
                <button className="bg-black p-3 rounded-lg">
                  <Image alt="wallet" src={wallet} width={20} />
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                alt="qr code"
                src={qrcode}
                width={150}
                className="border-2 p-2 border-gray-500 rounded-2xl"
              />
            </div>
            <div className="flex justify-center mt-5">
              <button
                className="bg-black text-white py-2.5 rounded-lg flex items-center gap-2 justify-center px-6 font-medium"
                onClick={handleOnClick}
              >
                <LiaFileMedicalSolid size={22} /> Create Microsite
              </button>
            </div>
          </div>
          <div className="py-8 px-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl text-gray-700 font-semibold">Websites</h3>
              <button className="border border-gray-500 rounded-lg px-4 py-2 flex items-center gap-1 font-medium">
                <CiSettings size={20} />
                Manage Sites
              </button>
            </div>
            <div className="shadow-medium rounded-2xl my-6 mx-10 pt-3 pb-8">
              <div>
                <div className="relative px-6">
                  <Image
                    alt="background image"
                    src={bgImg}
                    quality={100}
                    className="w-full"
                  />
                  <Image
                    alt="travis image"
                    src={travisImg}
                    width={130}
                    className="absolute -translate-y-24 left-1/2 -translate-x-[50%]"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center pt-10">
                <h2 className="text-xl font-bold">Travis Herron</h2>
                <p className="text-gray-500 font-medium">
                  Founder & CEO at SWOP
                </p>
              </div>
              <div className="flex items-center gap-4 justify-center mt-6">
                <button className="bg-black p-3 rounded-lg">
                  <Image alt="edit" src={edit} width={20} />
                </button>
                <button className="bg-black p-3 rounded-lg">
                  <Image alt="barcode" src={barcode} width={20} />
                </button>
                <button className="bg-black p-3 rounded-lg">
                  <Image alt="send" src={send} width={20} />
                </button>
                <button className="bg-black p-3 rounded-lg">
                  <Image alt="wallet" src={wallet} width={20} />
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                alt="qr code"
                src={qrcode}
                width={150}
                className="border-2 p-2 border-gray-500 rounded-2xl"
              />
            </div>
            <div className="flex justify-center mt-5">
              <button
                className="bg-black text-white py-2.5 rounded-lg flex items-center gap-2 justify-center px-6 font-medium"
                onClick={handleOnClick}
              >
                <LiaFileMedicalSolid size={22} /> Create Microsite
              </button>
            </div>
          </div>
          <div className="py-8 px-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl text-gray-700 font-semibold">Websites</h3>
              <button className="border border-gray-500 rounded-lg px-4 py-2 flex items-center gap-1 font-medium">
                <CiSettings size={20} />
                Manage Sites
              </button>
            </div>
            <div className="shadow-medium rounded-2xl my-6 mx-10 pt-3 pb-8">
              <div>
                <div className="relative px-6">
                  <Image
                    alt="background image"
                    src={bgImg}
                    quality={100}
                    className="w-full"
                  />
                  <Image
                    alt="travis image"
                    src={travisImg}
                    width={130}
                    className="absolute -translate-y-24 left-1/2 -translate-x-[50%]"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center pt-10">
                <h2 className="text-xl font-bold">Travis Herron</h2>
                <p className="text-gray-500 font-medium">
                  Founder & CEO at SWOP
                </p>
              </div>
              <div className="flex items-center gap-4 justify-center mt-6">
                <button className="bg-black p-3 rounded-lg">
                  <Image alt="edit" src={edit} width={20} />
                </button>
                <button className="bg-black p-3 rounded-lg">
                  <Image alt="barcode" src={barcode} width={20} />
                </button>
                <button className="bg-black p-3 rounded-lg">
                  <Image alt="send" src={send} width={20} />
                </button>
                <button className="bg-black p-3 rounded-lg">
                  <Image alt="wallet" src={wallet} width={20} />
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                alt="qr code"
                src={qrcode}
                width={150}
                className="border-2 p-2 border-gray-500 rounded-2xl"
              />
            </div>
            <div className="flex justify-center mt-5">
              <button
                className="bg-black text-white py-2.5 rounded-lg flex items-center gap-2 justify-center px-6 font-medium"
                onClick={handleOnClick}
              >
                <LiaFileMedicalSolid size={22} /> Create Microsite
              </button>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Microsite;
