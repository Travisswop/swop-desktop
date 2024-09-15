'use client';
import React, { useState } from 'react';
import { FaRegCopy } from 'react-icons/fa6';
import { IoCheckmark } from 'react-icons/io5';

const CopyWalletAddress = ({ walletAddress }: any) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className='flex items-center gap-2'>
      <button
        onClick={() => handleCopy()}
        className='text-gray-500 hover:text-black'
      >
        {copied ? (
          <IoCheckmark className='size-5' />
        ) : (
          <FaRegCopy className='size-5' />
        )}
      </button>
    </div>
  );
};

export default CopyWalletAddress;
