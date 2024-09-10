import Image from 'next/image';
import React from 'react';
import { FiSettings } from 'react-icons/fi';
import { TbEdit } from 'react-icons/tb';
import isUrl from '@/util/isUrl';
import { FaUserTie } from 'react-icons/fa';
import { BsQrCodeScan } from 'react-icons/bs';
import { TbLocationFilled } from 'react-icons/tb';
import { CgArrowsExchangeAlt } from 'react-icons/cg';
import { FiShoppingBag } from 'react-icons/fi';
import WalletTab from './WalletTab';
import Cashflow from '../cashflow/Cashflow';
import CashflowData from '../cashflow/CashflowData';
import ShowEnsName from '../ShowEnsName';
import Link from 'next/link';
import { getCashFlow } from '@/actions/cashflow';
import { log } from 'console';

const Wallet = async ({ profileData, data, microsites, token }: any) => {
  const getImgSrc = () => {
    const imageSrc = isUrl(profileData && profileData?.data?.profilePic)
      ? profileData?.data?.profilePic
      : `/images/user_avator/${profileData?.data?.profilePic}.png`;

    return imageSrc;
  };

  let walletBalance;
  let totalBalance = 0;

  if (data?.owner && data?.addresses['501']) {
    const walletObj = {
      ethAddress: data.owner,
      solanaAddress: data.addresses['501'],
      btcAddress: 'ererwewfsdsdweew',
    };

    const flowData = await getCashFlow(walletObj, token);

    walletBalance = flowData;

    if (walletBalance?.result) {
      totalBalance = walletBalance.result
        .map((item: { balance: any }) => parseFloat(item.balance))
        .reduce((acc: number, balance: number) => acc + balance, 0);
    }

    totalBalance = parseFloat(totalBalance.toFixed(2));
  }

  return (
    <div className='w-full'>
      {/* <div className='flex justify-end items-start'>
        <FiSettings className='size-5 text-[#424651] cursor-pointer hover:text-black' />
      </div> */}

      <div className='flex justify-center'>
        <div className='relative inline-block mx-0'>
          {/* <Image
            src={'/images/travis.png'}
            alt={'Travis'}
            width={500}
            height={500}
            className='mx-auto size-28'
          /> */}
          {profileData && profileData?.data?.profilePic ? (
            <Image
              src={getImgSrc()}
              alt='user image'
              width={100}
              height={100}
              className='mx-auto size-28 rounded-full border'
            />
          ) : (
            <div className='border rounded-full p-2'>
              <FaUserTie className='mx-auto size-28' />
            </div>
          )}
          <div className='absolute bottom-0 right-0'>
            <Link href={`/update-profile/${profileData?.data?._id}`}>
              <TbEdit className='size-8 text-[#424651] bg-white rounded-full p-1.5 cursor-pointer hover:bg-slate-50 hover:text-black border' />
            </Link>
          </div>
        </div>
      </div>
      <div className='text-[#424651] text-center mt-6'>
        <h2 className='text-[22px] font-bold'>{profileData?.data?.name}</h2>
        {/* <h3 className='text-[20px]'>
         
        </h3> */}

        <div className='flex justify-center'>
          <ShowEnsName data={profileData?.data} />
        </div>
      </div>
      <div className='text-black text-center mt-10 flex gap-6 justify-center items-start'>
        <div>
          <h2 className='text-[22px] font-bold'>
            {' '}
            {profileData?.data?.connections?.following?.length}
          </h2>
          <h3 className='text-[20px]'>Following</h3>
        </div>
        <div className='h-[60px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-black to-transparent'></div>
        <div>
          <h2 className='text-[22px] font-bold flex items-center'>
            {profileData?.data?.connections?.followers?.length}
            <span className='text-xs bg-[#7ae38b3c] p-1 text-[#00E725] rounded-full ml-1'>
              +24%
            </span>
          </h2>
          <h3 className='text-[20px]'>Followers</h3>
        </div>
      </div>
      <div
        className='flex items-center justify-between mt-6 gap-3
      '
      >
        <div className='w-[15%] bg-black p-2 rounded-xl flex items-center justify-center cursor-not-allowed hover:bg-[#424651]'>
          <Image
            src={'/images/homepage/wallet/qr.png'}
            alt={'Icon'}
            width={500}
            height={500}
            className='mx-auto size-9'
          />
        </div>
        <div className='w-[15%] bg-black p-2 rounded-xl flex items-center justify-center cursor-not-allowed hover:bg-[#424651]'>
          <Image
            src={'/images/homepage/wallet/send.png'}
            alt={'Icon'}
            width={500}
            height={500}
            className='mx-auto size-9'
          />
        </div>
        <div className='w-[40%] bg-black p-3 rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#424651]'>
          <p className='text-white text-center font-semibold text-2xl'>
            ${totalBalance}
          </p>
        </div>
        <div className='w-[15%] bg-black p-2 rounded-xl  flex items-center justify-center cursor-not-allowed hover:bg-[#424651]'>
          <Image
            src={'/images/homepage/wallet/in-app-swop.png'}
            alt={'Icon'}
            width={500}
            height={500}
            className='mx-auto size-9'
          />
        </div>
        <div className='w-[15%] bg-black p-2 rounded-xl flex items-center justify-center cursor-not-allowed hover:bg-[#424651]'>
          <Image
            src={'/images/homepage/wallet/copy.png'}
            alt={'Icon'}
            width={500}
            height={500}
            className='mx-auto size-9'
          />
        </div>
      </div>
      <div className='mt-8 flex items-center justify-center gap-3'>
        {/* <WalletTab /> */}
        <div className='bg-[#EEEEEE] p-2 rounded-lg gap-x-2 flex items-center'>
          <Image
            src={'/images/homepage/wallet/menu-1.png'}
            alt={'Icon'}
            width={500}
            height={500}
            className='mx-auto size-8'
          />
          <Image
            src={'/images/homepage/wallet/menu-2.png'}
            alt={'Icon'}
            width={500}
            height={500}
            className='mx-auto size-8'
          />
        </div>
        <div className='bg-[#EEEEEE] p-2 rounded-lg gap-x-2 flex items-center'>
          <Image
            src={'/images/homepage/wallet/wallet.png'}
            alt={'Icon'}
            width={500}
            height={500}
            className='mx-auto size-8'
          />
        </div>

        <div className='bg-[#EEEEEE] p-2 rounded-lg gap-x-2 flex items-center'>
          <Image
            src={'/images/homepage/wallet/message.png'}
            alt={'Icon'}
            width={500}
            height={500}
            className='mx-auto size-8'
          />
        </div>

        <div className='bg-[#EEEEEE] p-2 rounded-lg gap-x-2 flex items-center'>
          <Image
            src={'/images/homepage/wallet/NFT.png'}
            alt={'Icon'}
            width={500}
            height={500}
            className='mx-auto size-8'
          />
        </div>

        <div className='bg-[#EEEEEE] p-2 rounded-lg gap-x-2 flex items-center'>
          <Image
            src={'/images/homepage/wallet/Mining.png'}
            alt={'Icon'}
            width={500}
            height={500}
            className='mx-auto size-8'
          />
        </div>

        <div className='bg-[#EEEEEE] p-2 rounded-lg gap-x-2 flex items-center'>
          <Image
            src={'/images/homepage/wallet/dashboard.png'}
            alt={'Icon'}
            width={500}
            height={500}
            className='mx-auto size-8'
          />
        </div>

        <div className='bg-[#EEEEEE] p-2 rounded-lg gap-x-2 flex items-center'>
          <Image
            src={'/images/homepage/wallet/transaction-history.png'}
            alt={'Icon'}
            width={500}
            height={500}
            className='mx-auto size-8'
          />
        </div>

        <div className='bg-[#EEEEEE] p-2 rounded-lg flex items-center'>
          <Image
            src={'/images/homepage/wallet/network-selection.png'}
            alt={'Icon'}
            width={500}
            height={500}
            className='mx-auto size-8'
          />
          <Image
            src={'/images/homepage/wallet/arrow.png'}
            alt={'Icon'}
            width={500}
            height={500}
            className='mx-auto size-3'
          />
        </div>
      </div>
      <div>
        <Cashflow data={data} token={token} microsites={microsites} />
      </div>
    </div>
  );
};

export default Wallet;
