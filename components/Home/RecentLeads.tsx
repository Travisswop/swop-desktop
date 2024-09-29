"use client";
import React, { FC } from "react";
import { Parser } from "json2csv";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HiOutlinePhone } from "react-icons/hi";
import { CgMail } from "react-icons/cg";
import { FiDownload } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

// import 'swiper/css/pagination';

// import required modules
import { Pagination } from "swiper/modules";

// import "swiper/css/effect-creative";
import { TbLocation } from "react-icons/tb";

import "swiper/css/grid";
import { Navigation, Grid } from "swiper/modules";
import Link from "next/link";
import AnimateButton from "../Button/AnimateButton";

const RecentLeads = ({ subscribers, sessionUserName }: any) => {
  // const downloadCSV = (subscriberId: any) => {
  //   // Define the fields you want in the CSV
  //   const fields = ['name', 'jobTitle', 'email', 'mobileNo'];

  //   // Use json2csv parser to convert the data
  //   const json2csvParser = new Parser({ fields });
  //   const csv = json2csvParser.parse(subscribers);

  //   // Create a blob and download the file
  //   const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.setAttribute('download', 'data.csv');
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const downloadCSV = (subscriberId: string | null) => {
    // Define the fields you want in the CSV
    const fields = ["name", "jobTitle", "email", "mobileNo"];

    // If subscriberId is provided, filter to find the specific subscriber
    let dataToDownload;
    if (subscriberId) {
      dataToDownload = subscribers.filter(
        (subscriber: any) => subscriber._id === subscriberId
      );
    } else {
      // If subscriberId is null, download all leads
      dataToDownload = subscribers;
    }

    // Use json2csv parser to convert the data
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(dataToDownload);

    // Create a blob and download the file
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Subscriber-Leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // console.log("subscrivers", subscribers);

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
        // pagination={true}
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
            <div className="px-10 bg-white">
              <div className="border border-gray-300 rounded-lg">
                <div className="border-b border-gray-300 flex items-center justify-between py-3">
                  <h3 className="text-lg font-bold ml-4 text-gray-700">
                    {sessionUserName}
                  </h3>
                </div>
                <div className="mx-4 my-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    <h5 className="text-lg font-bold text-gray-700">
                      {subscriber.name}
                    </h5>
                    <p className="text-base font-normal text-gray-600">
                      {subscriber.jobTitle}
                    </p>
                    <p className="text-base font-medium text-gray-500 flex items-center gap-1 mt-3">
                      <HiOutlinePhone size={18} />
                      {subscriber.mobileNo}
                    </p>
                    <p className="text-base font-medium text-gray-500 flex items-center gap-1">
                      <CgMail size={20} /> {subscriber.email}
                    </p>
                  </div>
                  {/* <button className="flex items-center gap-2 px-6 py-2 border border-gray-400 rounded-xl font-semibold hover:bg-gray-700 hover:text-white text-gray-600">
                    <LuPhoneCall /> Contact Lead
                  </button> */}
                  <div className="flex flex-wrap items-center gap-1 justify-center">
                    {/* <Link href={`tel:${subscriber.mobileNo}`}>
                      <AnimateButton
                        width='w-full'
                        className='text-gray-700 flex gap-1 text-lg'
                      >
                        <PiPhoneCall className='size-6' />
                        Contact Lead
                      </AnimateButton>
                    </Link> */}
                    <Link
                      href={`tel:${subscriber.mobileNo}`}
                      className="bg-black rounded-lg flex items-center justify-center w-10 h-10"
                    >
                      <HiOutlinePhone size={18} className=" text-white" />
                    </Link>
                    <Link
                      href={`mailto:${subscriber.email}`}
                      className="bg-black rounded-lg w-10 h-10 flex items-center justify-center"
                    >
                      <CgMail size={20} className="text-white" />
                    </Link>
                    <button
                      onClick={() => downloadCSV(subscriber._id)}
                      className="bg-black rounded-lg w-10 h-10 flex items-center justify-center"
                    >
                      <FiDownload size={20} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-center mt-10">
        <AnimateButton
          width="w-60"
          className="text-gray-700 flex gap-1"
          onClick={() => downloadCSV(null)}
        >
          <TbLocation size={20} />
          Export Leads to CSV
        </AnimateButton>
      </div>
    </div>
  );
};

export default RecentLeads;
