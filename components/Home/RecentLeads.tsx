"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HiOutlinePhone } from "react-icons/hi";
import { CgMail } from "react-icons/cg";
import { LuPhoneCall } from "react-icons/lu";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
// import "swiper/css/effect-creative";

import "swiper/css/grid";
import { Navigation, Grid } from "swiper/modules";

const RecentLeads = ({ subscribers }: any) => {
  console.log("subscribers", subscribers);

  return (
    <div className="">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        grid={{
          rows: 2,
          fill: "row",
        }}
        navigation={true}
        // grabCursor={true}
        // effect={"creative"}
        // loop={true}
        // creativeEffect={{
        //   prev: {
        //     shadow: true,
        //     translate: ["-20%", 0, -1],
        //   },
        //   next: {
        //     translate: ["100%", 0, 0],
        //   },
        // }}
        modules={[Navigation, Grid]}
        className="myRecentLeadsSwiper"
      >
        {subscribers.map((subscriber: any) => (
          <SwiperSlide key={subscriber._id}>
            <div className="px-6 bg-white">
              <div className="border border-gray-300 rounded-lg">
                <div className="border-b border-gray-300 flex items-center justify-between py-4">
                  <h3 className="text-lg font-bold ml-4 text-gray-700">
                    Travis Main
                  </h3>
                </div>
                <div className="mx-4 my-4 flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <h5 className="text-lg font-bold text-gray-600">
                      {subscriber.name}
                    </h5>
                    <p className="text-base font-medium text-gray-500">
                      {subscriber.bio}
                    </p>
                    <p className="text-base font-medium text-gray-500 flex items-center gap-1">
                      <HiOutlinePhone />
                      {subscriber.mobileNo}
                    </p>
                    <p className="text-base font-medium text-gray-500 flex items-center gap-1">
                      <CgMail /> {subscriber.email}
                    </p>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-2 border border-gray-400 rounded-xl font-semibold hover:bg-gray-700 hover:text-white">
                    <LuPhoneCall /> Contact Lead
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RecentLeads;
