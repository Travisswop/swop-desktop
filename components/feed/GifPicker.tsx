import React, { useState } from "react";
import GifPicker from "gif-picker-react";
import { HiOutlineGif } from "react-icons/hi2";

interface GifProps {
  onGifSelect: (gif: string) => void;
}

const GifPickerContent = ({ onGifSelect }: GifProps) => {
  const [showPicker, setShowPicker] = useState(false);

  const toggleGif = () => {
    setShowPicker(!showPicker);
  };

  const handleGifClick = (gifData: any) => {
    onGifSelect(gifData.url);
  };

  return (
    <div className="relative flex items-center">
      <button onClick={toggleGif}>
        <HiOutlineGif size={23} className="text-gray-700" />
      </button>
      {showPicker && (
        <div className="absolute top-full mt-2 z-10">
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
