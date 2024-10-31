import React, { useEffect, useRef, useState } from "react";
import GifPicker from "gif-picker-react";
import { HiOutlineGif } from "react-icons/hi2";

interface GifProps {
  onGifSelect: (gif: string) => void;
}

const GifPickerContent = ({ onGifSelect }: GifProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleGif = () => {
    setShowPicker(!showPicker);
  };

  const handleGifClick = (gifData: any) => {
    onGifSelect(gifData.url);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  return (
    <div className="relative flex items-center">
      <button ref={buttonRef} onClick={toggleGif}>
        <HiOutlineGif size={23} className="text-gray-700" />
      </button>
      {showPicker && (
        <div ref={pickerRef} className="absolute top-full mt-2 z-10">
          <GifPicker
            onGifClick={handleGifClick}
            tenorApiKey={"AIzaSyA-Xn0TwTUBNXY4EBbDCmnAs7o1XYIoZgU"}
          />
        </div>
      )}
    </div>
  );
};

export default GifPickerContent;
