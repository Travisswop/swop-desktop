"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { MdOutlineAddBox } from "react-icons/md";
import twitter from "@/public/images/websites/edit-microsite/twitter.svg";
import youtube from "@/public/images/websites/edit-microsite/youtube.svg";
import linkedin from "@/public/images/websites/edit-microsite/linkedin.svg";
import swopPay from "@/public/images/websites/edit-microsite/swop-pay.svg";
import contactCard from "@/public/images/websites/edit-microsite/contact-card.svg";
import mp4 from "@/public/images/websites/edit-microsite/mp4.svg";
import photosVideos from "@/public/images/websites/edit-microsite/photos-videos.svg";
import redeemLink from "@/public/images/websites/edit-microsite/redeem-link.svg";
import { FaRegSquareMinus } from "react-icons/fa6";

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        // marginRight: 20,
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
        // marginLeft: 20,
      }}
      onClick={onClick}
    />
  );
}

const IconMaker = ({ handleAddIcon, handleRemoveIcon, toggleIcon }: any) => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 730,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 4,
        },
      },
    ],
  };

  const iconBuilderArry = [
    {
      _id: 1234,
      src: twitter,
      title: "Small Icon",
    },
    {
      _id: 1234,
      src: youtube,
      title: "Embed",
    },
    {
      _id: 1234,
      src: linkedin,
      title: "Info Button",
    },
    {
      _id: 1234,
      src: swopPay,
      title: "Sell Products",
    },
    {
      _id: 1234,
      src: contactCard,
      title: "Contact Card",
    },
    {
      _id: 1234,
      src: mp4,
      title: "Music Files",
    },
    {
      _id: 1234,
      src: photosVideos,
      title: "Photos / Videos",
    },
    {
      _id: 1234,
      src: redeemLink,
      title: "Redeem Links",
    },
  ];

  return (
    <div className="w-full">
      <div className="slider-container">
        <Slider {...settings}>
          {iconBuilderArry.map((data) => (
            <div key={data._id} className="px-2 py-2">
              <div className="bg-white px-2 py-6 rounded-2xl flex flex-col items-center gap-3 h-40 2xl:h-40 shadow-md">
                <p className="text-center h-[45%] text-sm font-medium">
                  {data.title}
                </p>
                <div className="h-[45%]  my-auto w-full flex justify-center items-center">
                  <Image alt="icon" src={data.src} />
                </div>
                {toggleIcon.find((item: any) => item == data.title) ? (
                  <button
                    onClick={() => handleRemoveIcon(data.title)}
                    className="h-[10%] "
                  >
                    <FaRegSquareMinus size={18} />
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddIcon(data.title)}
                    className="h-[10%] "
                  >
                    <MdOutlineAddBox size={20} />
                  </button>
                )}
                {/* <button
                  onClick={() => handleAddIcon(data.title)}
                  className="h-[10%] "
                >
                  <MdOutlineAddBox size={20} />
                </button> */}
                {/* // <button
                //   onClick={() => handleRemoveIcon(data.title)}
                //   className="h-[10%] "
                // >
                //   <FaRegSquareMinus size={18} />
                // </button> */}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default IconMaker;