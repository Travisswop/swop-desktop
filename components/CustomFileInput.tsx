import React, { useRef, ChangeEvent } from "react";

interface CustomFileInputProps {
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({
  handleFileChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        onClick={handleButtonClick}
        type="button"
        className="px-3 py-1 text-[#b463fa] border-2 border-[#b463fa] rounded-lg focus:outline-none text-xs font-medium"
      >
        Browse
      </button>
    </div>
  );
};

export default CustomFileInput;
