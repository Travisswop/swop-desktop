'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.min.css';

const DashboardSlider = ({ walletList, totalBalance }: any) => {
  return (
    <Swiper spaceBetween={15} slidesPerView={4} loop={true} grabCursor={true}>
      {walletList?.result
        ?.filter((el: any) => parseFloat(el?.balance) !== 0)
        ?.map((item: any, index: number) => (
          <SwiperSlide
            key={index}
            className={`flex items-center justify-center p-2.5 rounded-2xl text-white`}
            style={{ backgroundColor: item?.data?.color }}
          >
            <div className='text-base font-medium gap-x-2 flex items-center justify-center'>
              <p>{item?.data?.symbol}</p>
              <p>
                {parseFloat(item.balance) !== 0
                  ? `${(
                      (parseFloat(item.balance) / totalBalance) *
                      100
                    ).toFixed(2)}%`
                  : '0.00%'}
              </p>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default DashboardSlider;
