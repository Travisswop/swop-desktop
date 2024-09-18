'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRegCopy } from 'react-icons/fa6';
import { IoCheckmark } from 'react-icons/io5';
import Image from 'next/image';

const WalletAddsCopy = ({ microsites }: any) => {
  const dropdownList = [
    { title: 'Ethereum', address: microsites[0]?.ensData?.addresses?.[60] },
    { title: 'Polygon', address: microsites[0]?.ensData?.addresses?.[60] },
    { title: 'Base', address: microsites[0]?.ensData?.addresses?.[60] },
    { title: 'Solana', address: microsites[0]?.ensData?.addresses?.[501] },
  ];

  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = (address: string, title: string) => {
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

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [dropdownPosition, setDropdownPosition] = useState('left');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    setTimeout(() => {
      setIsOpen(false);
    }, 1000);
  };

  const adjustDropdownPosition = () => {
    if (dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      // Check if there's enough space on the right side
      if (dropdownRect.right > viewportWidth) {
        setDropdownPosition('right'); // Position dropdown to the right
      } else if (dropdownRect.left < 0) {
        setDropdownPosition('left'); // Position dropdown to the left
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      adjustDropdownPosition();
    }
  }, [isOpen]);

  return (
    <div>
      <div className='flex items-center gap-4'>
        <div className='relative inline-block z-20'>
          <Image
            src={'/images/homepage/wallet/copy.png'}
            alt={'Icon'}
            width={500}
            height={500}
            className='mx-auto size-9 '
            onClick={() => setIsOpen(!isOpen)}
          />

          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={dropdownRef}
                className={`absolute mt-4 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
                  dropdownPosition === 'left' ? 'right-0' : 'left-0'
                }`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <ul className='py-1'>
                  {dropdownList?.map((el, index) => (
                    <li
                      key={index}
                      className='block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer'
                      onClick={() => handleSelect(el.title)}
                    >
                      <div className='flex items-center justify-between'>
                        <div>
                          <h3 className='text-base font-medium'>{el.title}</h3>
                          <p className='text-gray-500'>
                            {`${el.address.slice(0, 5)}....${el.address.slice(
                              -5,
                            )}`}
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
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default WalletAddsCopy;
