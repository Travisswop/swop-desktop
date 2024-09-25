'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

const DashboardSlider = ({ walletList, totalBalance }: any) => {
  return (
    <div className=''>
      <Swiper spaceBetween={12} slidesPerView={3} loop={true} grabCursor={true}>
        {walletList
          ?.filter((el: any) => parseFloat(el?.balance) !== 0)
          ?.map((item: any, index: number) => (
            <SwiperSlide
              key={index}
              className={`flex items-center justify-center p-2.5 rounded-xl text-white`}
              style={{ backgroundColor: item?.data?.color }}
            >
              <div className='text-base font-medium gap-x-1 flex items-center justify-center'>
                <p>{item?.data?.symbol}</p>
                <p>
                  {parseFloat(item.balance) !== 0
                    ? `${(
                        (parseFloat(item.balance) / totalBalance) *
                        100
                      ).toFixed(4)}%`
                    : '0.00%'}
                </p>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default DashboardSlider;
