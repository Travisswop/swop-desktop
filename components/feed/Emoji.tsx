"use client";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import React, { useState, useRef, useEffect } from "react";
import { GrEmoji } from "react-icons/gr";

interface EmojiProps {
  onEmojiSelect: (emoji: string) => void;
}

const Emoji = ({ onEmojiSelect }: EmojiProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onEmojiSelect(emojiData.emoji); // Add the selected emoji to the textarea
  };

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
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
      <button onClick={togglePicker}>
        <GrEmoji size={22} className="text-gray-800" />
      </button>

      {showPicker && (
        <div ref={pickerRef} className="absolute top-full mt-2 z-10">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default Emoji;
