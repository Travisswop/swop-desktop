'use client';
import React, { useState } from 'react';
import { FaRegCopy } from 'react-icons/fa6';
import { IoCheckmark } from 'react-icons/io5';

import Image from 'next/image';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';

const WalletAddsCopy = ({ microsites }: any) => {
  const dropdownList = [
    { title: 'Ethereum', address: microsites[0]?.ensData?.addresses?.[60] },
    { title: 'Polygon', address: microsites[0]?.ensData?.addresses?.[60] },
    { title: 'Base', address: microsites[0]?.ensData?.addresses?.[60] },
    { title: 'Solana', address: microsites[0]?.ensData?.addresses?.[501] },
  ];

  const [copiedItem, setCopiedItem] = useState(null);

  const copyToClipboard = (address: any, title: any) => {
    navigator.clipboard.writeText(address).then(
      () => {
        setCopiedItem(title);
        setTimeout(() => setCopiedItem(null), 2000);
      },
      (err) => {
        console.error('Failed to copy: ', err);
      },
    );
  };

  return (
    <div>
      <div className='flex items-center gap-4'>
        <Dropdown placement='bottom-start'>
          <DropdownTrigger>
            <Image
              src={'/images/homepage/wallet/copy.png'}
              alt={'Icon'}
              width={500}
              height={500}
              className='mx-auto size-9 '
            />
          </DropdownTrigger>
          <DropdownMenu aria-label='User Actions' variant='light'>
            {dropdownList.map((el) => (
              <DropdownItem key={el.title} aria-label={el.title}>
                <div className='flex items-center justify-between'>
                  <div>
                    <h3 className='text-base font-medium'>{el.title}</h3>
                    <p className='text-gray-500'>
                      {' '}
                      {`${el.address.slice(0, 5)}....${el.address.slice(-5)}`}
                    </p>
                  </div>

                  <button
                    onClick={() => copyToClipboard(el.address, el.title)}
                    className='text-gray-500 hover:text-black'
                  >
                    {copiedItem === el.title ? (
                      <IoCheckmark className='size-5' />
                    ) : (
                      <FaRegCopy className='size-5' />
                    )}
                  </button>
                </div>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default WalletAddsCopy;
