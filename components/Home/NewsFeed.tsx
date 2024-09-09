import Image from 'next/image';
import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { LuDot } from 'react-icons/lu';
import { GoPlusCircle } from 'react-icons/go';
import { PiArrowFatUp } from 'react-icons/pi';
import { LuRepeat } from 'react-icons/lu';
import { FiHeart } from 'react-icons/fi';
import { HiOutlineUpload } from 'react-icons/hi';

const NewsFeed = () => {
  return (
    <div className='w-full'>
      <div className='w-full flex item justify-between'>
        <div className='flex items-start gap-x-4'>
          <Image
            src={'/images/homepage/HawkTuah.png'}
            alt={'HawkTuah'}
            width={500}
            height={500}
            className='size-14'
          />
          <h2 className='font-medium text-black text-xl'>HawkTuah</h2>
          <h2 className='font-normal text-[#8D8D8D] text-xl'>
            Hawktuah.Swop.ID
          </h2>
          <h2 className='font-medium text-black text-xl flex items-center'>
            <LuDot className='size-6' />
            <span>1d</span>
          </h2>
        </div>
        <div>
          <BsThreeDots className='size-8 text-[#8D8D8D] hover:text-black cursor-pointer' />
        </div>
      </div>
      <div className='w-full flex items-center justify-start gap-x-6 ml-16'>
        <div className='bg-white shadow-md rounded-xl p-4'>
          <div className='flex justify-end items-center mb-1'>
            <GoPlusCircle className='text-2xl text-[#424651] hover:text-black cursor-pointer' />
          </div>
          <Image
            src={'/images/homepage/coupon.png'}
            alt={'Coupon'}
            width={500}
            height={500}
            className='size-36'
          />
          <h2 className='text-lg text-center mt-2'>$29.99</h2>
        </div>
        <div className='bg-white shadow-md rounded-xl p-4'>
          <div className='flex justify-end items-center mb-1'>
            <GoPlusCircle className='text-2xl text-[#424651] hover:text-black cursor-pointer' />
          </div>
          <Image
            src={'/images/homepage/coupon.png'}
            alt={'Coupon'}
            width={500}
            height={500}
            className='size-36'
          />
          <h2 className='text-lg text-center mt-2'>$29.99</h2>
        </div>
        <div className='bg-white shadow-md rounded-xl p-4'>
          <div className='flex justify-end items-center mb-1'>
            <GoPlusCircle className='text-2xl text-[#424651] hover:text-black cursor-pointer' />
          </div>
          <Image
            src={'/images/homepage/coupon.png'}
            alt={'Coupon'}
            width={500}
            height={500}
            className='size-36'
          />
          <h2 className='text-lg text-center mt-2'>$29.99</h2>
        </div>
      </div>

      <div className='flex items-center justify-start gap-x-12 mt-16 ml-16'>
        <div className='flex items-center gap-x-1'>
          <PiArrowFatUp className='text-2xl text-[#424651] hover:text-black cursor-pointer' />
          <p>123</p>
        </div>
        <div className='flex items-center gap-x-1'>
          <LuRepeat className='text-2xl text-[#424651] hover:text-black cursor-pointer' />
          <p>98</p>
        </div>
        <div className='flex items-center gap-x-1'>
          <FiHeart className='text-2xl text-[#424651] hover:text-black cursor-pointer' />
          <p>7</p>
        </div>
        <div className='flex items-center gap-x-1'>
          <HiOutlineUpload className='text-2xl text-[#424651] hover:text-black cursor-pointer' />
          <p>7</p>
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
