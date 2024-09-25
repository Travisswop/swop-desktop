'use client';
import useWalletQrCode from '@/zustandStore/walletQrCode';
import Image from 'next/image';
import React from 'react';

const WalletQrButton: React.FC = () => {
  const { walletQrCode, setWalletQrCode } = useWalletQrCode();

  return (
    <button
      onClick={() => setWalletQrCode(!walletQrCode)}
      aria-label='Toggle Wallet QR Code'
    >
      <div className='size-9'>
        <Image
          src={'/images/homepage/wallet/qr.png'}
          alt={'Wallet QR Code'}
          width={500}
          height={500}
          className='mx-auto size-9'
          priority
        />
      </div>
    </button>
  );
};

export default WalletQrButton;
