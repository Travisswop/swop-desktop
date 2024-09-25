'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { HiOutlineWallet } from 'react-icons/hi2';

const TransectionDetailsView = ({
  microsites,
  selectTransection,
  transactionData,
  walletObj,
  flowData,
}: any) => {
  const convertTimestampToDateTime = (timestamp: any) => {
    const date = new Date(timestamp * 1000);

    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }).format(date);

    const formattedTime = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);

    return `${formattedTime} ${formattedDate}`;
  };

  const weiToEther = (wei: number) => wei / 1e18;
  const weiToSolana = (wei: number) => wei / 1e9;

  const transactionFeeMap: Record<string, (wei: number) => number> = {
    ethereum: weiToEther,
    polygon: weiToEther,
    base: weiToEther,
    solana: weiToSolana,
  };

  const transactionFee = transactionData?.result
    ?.filter((el: any, no: number) => no === selectTransection)
    ?.map((item: any) => {
      const gasFee = item?.gasPrice * item?.gasUsed;

      const transactionFee = transactionFeeMap[item?.network](gasFee);
      let transactionFeeInUsd: number | undefined;

      if (item?.network === 'ethereum' && flowData?.tokenPrices?.[0]?.ETH) {
        transactionFeeInUsd = transactionFee * flowData.tokenPrices[0].ETH;
      } else if (
        item?.network === 'polygon' &&
        flowData?.tokenPrices?.[3]?.MATIC
      ) {
        transactionFeeInUsd = transactionFee * flowData.tokenPrices[3].MATIC;
      } else if (
        item?.network === 'solana' &&
        flowData?.tokenPrices?.[12]?.SOL
      ) {
        transactionFeeInUsd = transactionFee * flowData.tokenPrices[12].SOL;
      }
      return { usdFee: transactionFeeInUsd ?? 0, btcFee: transactionFee };
    });

  return (
    <div className='mt-8 mx-0'>
      <div className='flex justify-center items-center'>
        <div className='bg-black p-3 size-16 rounded-full flex items-center justify-center'>
          <HiOutlineWallet className='size-8 text-white ' />
        </div>
      </div>

      {transactionData?.result
        ?.filter((el: any, no: number) => no === selectTransection)
        .map((item: any, index: number) => (
          <div key={index}>
            <h2 className='mt-6 text-4xl font-bold text-center text-black'>{`$${parseFloat(
              (item.tokenPrice * item.value) as any,
            ).toFixed(2)}`}</h2>

            <div className='flex items-center justify-center gap-x-2 mt-3'>
              <h2 className='text-lg text-center'>{`${parseFloat(
                item.value,
              ).toFixed(6)}`}</h2>
              <h2 className='text-lg text-center'>{item?.tokenSymbol}</h2>
            </div>

            <div className='flex items-start justify-between'>
              <h2 className='mt-6 text-lg font-semibold text-center'>
                Recipient
              </h2>
              <div>
                <h2 className='mt-6 text-lg font-semibold text-right'>
                  {microsites[0]?.ens}
                </h2>
                <h2 className='text-sm text-center mt-2'>
                  {`${walletObj?.ethAddress.slice(
                    0,
                    10,
                  )}....${walletObj?.ethAddress.slice(-10)}`}
                </h2>
              </div>
            </div>

            <div className='flex items-start justify-between mt-6'>
              <h2 className='mt-6 text-lg font-semibold text-center'>Amount</h2>
              <div>
                <h2 className='mt-6 text-lg font-semibold text-right'>
                  {`$${parseFloat(
                    (item.tokenPrice * item.value) as any,
                  ).toFixed(2)}`}
                </h2>
                <div className='flex items-center gap-x-2 mt-3'>
                  <h2 className='text-sm text-center'>
                    {`${item?.to?.slice(0, 10)}....${item?.to?.slice(-10)}`}
                  </h2>
                  <h2 className='text-sm text-center'>{item?.tokenSymbol}</h2>
                  <Image
                    src={
                      item.tokenSymbol === 'SOL'
                        ? '/images/homepage/Solana.png'
                        : item.tokenSymbol === 'ETH'
                        ? '/images/homepage/ETH.png'
                        : item.tokenSymbol === 'USDC' ||
                          item.tokenSymbol === 'WETH'
                        ? '/images/homepage/USDC.png'
                        : item.tokenSymbol === 'MATIC' ||
                          item.tokenSymbol === 'WETH' ||
                          item.tokenSymbol === 'DAI' ||
                          item.tokenSymbol === 'AAVE' ||
                          item.tokenSymbol === 'POL'
                        ? '/images/homepage/Polygon.png'
                        : '/images/homepage/Polygon.png'
                    }
                    alt='coin icon'
                    width={100}
                    height={100}
                    className='size-4 rounded-full'
                  />
                </div>
              </div>
            </div>

            <div className='flex items-start justify-between mt-6'>
              <h2 className='mt-6 text-lg font-semibold text-center'>
                Network Fee
              </h2>
              <div>
                <h2 className='mt-6 text-lg font-semibold text-right'>
                  ${transactionFee[0]?.usdFee?.toFixed(8)}
                </h2>
                <div className='flex items-center gap-x-2 mt-3'>
                  <h2 className='text-sm text-center '>
                    {transactionFee[0]?.btcFee?.toFixed(8)}
                  </h2>
                  <h2 className='text-sm text-center '>{item?.tokenSymbol}</h2>
                  <Image
                    src={
                      item.tokenSymbol === 'SOL'
                        ? '/images/homepage/Solana.png'
                        : item.tokenSymbol === 'ETH'
                        ? '/images/homepage/ETH.png'
                        : item.tokenSymbol === 'USDC' ||
                          item.tokenSymbol === 'WETH'
                        ? '/images/homepage/USDC.png'
                        : item.tokenSymbol === 'MATIC' ||
                          item.tokenSymbol === 'WETH' ||
                          item.tokenSymbol === 'DAI' ||
                          item.tokenSymbol === 'AAVE' ||
                          item.tokenSymbol === 'POL'
                        ? '/images/homepage/Polygon.png'
                        : '/images/homepage/Polygon.png'
                    }
                    alt='coin icon'
                    width={100}
                    height={100}
                    className='size-4 rounded-full'
                  />
                </div>
              </div>
            </div>

            <div className='flex items-center justify-between mt-8'>
              <h2 className='text-lg font-semibold text-center'>Complete</h2>
              <h2 className='text-base text-center'>
                {convertTimestampToDateTime(item?.timeStamp)}
              </h2>
            </div>

            {/* <div className='flex items-center justify-between mt-6'>
              <h2 className='mt-6 text-xl font-semibold *:'>Claim Link</h2>
              <h2 className='text-xl mt-2 text-[#B396FF]'>Claimed</h2>
            </div>

            <h2 className='text-base mt-6 '>
              https://go.s-w.com/claim?your....
            </h2>

            <h2 className='text-xl text-center mt-6 text-[#B396FF] cursor-pointer'>
              View onblock explorer
            </h2> */}
          </div>
        ))}
    </div>
  );
};

export default TransectionDetailsView;
