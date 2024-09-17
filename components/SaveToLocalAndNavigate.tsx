"use client"; 

import { useEffect } from "react";
import { useRouter } from "next/router";

interface SaveToLocalAndNavigateProps {
  collectionId: string;
}

const SaveToLocalAndNavigate: React.FC<SaveToLocalAndNavigateProps> = ({ collectionId }) => {
  const router = useRouter();

  const handleClick = () => {
    // Save the collectionId to localStorage
    localStorage.setItem("collectionId", collectionId);

    // Navigate to the desired route
    router.push("/mint/createTemplate");
  };

  return (
    <button
      className="px-4 py-2 text-sm font-medium border border-gray-400 rounded-lg"
      onClick={handleClick}
    >
      Add NFTs To This Collection
    </button>
  );
};

export default SaveToLocalAndNavigate;
