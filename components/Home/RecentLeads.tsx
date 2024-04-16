"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HiOutlinePhone } from "react-icons/hi";
import { CgMail } from "react-icons/cg";
import { LuPhoneCall } from "react-icons/lu";

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

const RecentLeads = () => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="w-full">
      <div className="slider-container">
        <Slider {...settings} className="">
          <div className="px-2">
            <div className="border border-gray-300 rounded-lg">
              <div className="border-b border-gray-300 flex items-center justify-between py-4">
                <h3 className="text-lg font-bold ml-4 text-gray-700">
                  Travis Main
                </h3>
              </div>
              <div className="mx-4 my-4 flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <h5 className="text-lg font-bold text-gray-600">
                    Jakob Rhiel Madsen
                  </h5>
                  <p className="text-base font-medium text-gray-500">
                    Marketing Officer
                  </p>
                  <p className="text-base font-medium text-gray-500 flex items-center gap-1">
                    <HiOutlinePhone />
                    (336567-6403)
                  </p>
                  <p className="text-base font-medium text-gray-500 flex items-center gap-1">
                    <CgMail /> jakobrhiel@gmail.com
                  </p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2 border border-gray-400 rounded-xl font-semibold hover:bg-gray-700 hover:text-white">
                  <LuPhoneCall /> Contact Lead
                </button>
              </div>
              <hr className="border border-gray-200" />
              <div className="mx-4 my-4 flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <h5 className="text-lg font-bold text-gray-600">
                    Jakob Rhiel Madsen
                  </h5>
                  <p className="text-base font-medium text-gray-500">
                    Marketing Officer
                  </p>
                  <p className="text-base font-medium text-gray-500 flex items-center gap-1">
                    <HiOutlinePhone />
                    (336567-6403)
                  </p>
                  <p className="text-base font-medium text-gray-500 flex items-center gap-1">
                    <CgMail /> jakobrhiel@gmail.com
                  </p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2 border border-gray-400 rounded-xl font-semibold hover:bg-gray-700 hover:text-white">
                  <LuPhoneCall /> Contact Lead
                </button>
              </div>
            </div>
          </div>
          <div className="px-2">
            <div className="border border-gray-300 rounded-lg">
              <div className="border-b border-gray-300 flex items-center justify-between py-4">
                <h3 className="text-lg font-bold ml-4 text-gray-700">
                  Travis Main
                </h3>
              </div>
              <div className="mx-4 my-4 flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <h5 className="text-lg font-bold text-gray-600">
                    Jakob Rhiel Madsen
                  </h5>
                  <p className="text-base font-medium text-gray-500">
                    Marketing Officer
                  </p>
                  <p className="text-base font-medium text-gray-500 flex items-center gap-1">
                    <HiOutlinePhone />
                    (336567-6403)
                  </p>
                  <p className="text-base font-medium text-gray-500 flex items-center gap-1">
                    <CgMail /> jakobrhiel@gmail.com
                  </p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2 border border-gray-400 rounded-xl font-semibold hover:bg-gray-700 hover:text-white">
                  <LuPhoneCall /> Contact Lead
                </button>
              </div>
              <hr className="border border-gray-200" />
              <div className="mx-4 my-4 flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <h5 className="text-lg font-bold text-gray-600">
                    Jakob Rhiel Madsen
                  </h5>
                  <p className="text-base font-medium text-gray-500">
                    Marketing Officer
                  </p>
                  <p className="text-base font-medium text-gray-500 flex items-center gap-1">
                    <HiOutlinePhone />
                    (336567-6403)
                  </p>
                  <p className="text-base font-medium text-gray-500 flex items-center gap-1">
                    <CgMail /> jakobrhiel@gmail.com
                  </p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2 border border-gray-400 rounded-xl font-semibold hover:bg-gray-700 hover:text-white">
                  <LuPhoneCall /> Contact Lead
                </button>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default RecentLeads;
