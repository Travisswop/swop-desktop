"use client";
import React from "react";

const TestShare = (qrCodeUrl) => {
  const base64ToFile = async (base64String, fileName) => {
    const response = await fetch(base64String);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  };

  const shareImage = async () => {
    try {
      const file = await base64ToFile(qrCodeUrl, "shared-image.png");

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Check out this image!",
          text: "Cool image!",
        });
      } else {
        alert("File sharing is not supported on this device.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };
  return (
    <div>
      <button onClick={shareImage}>share</button>
    </div>
  );
};

export default TestShare;
