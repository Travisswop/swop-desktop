"use client";
import { MotionButton } from "@/util/Motion";
import React from "react";

interface btnProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: any;
}

// we need to use important in case any passed className won't work

const DynamicPrimaryBtn = ({
  children,
  className,
  disabled = false,
  onClick = null,
}: btnProps) => {
  // Define the default classes
  const defaultClasses = `relative overflow-hidden flex justify-center items-center gap-1 px-5 py-2 rounded-xl text-white bg-black font-medium hover:text-white hover:bg-gradient-to-r hover:from-black hover:to-white hover:bg-[length:200%_100%] hover:animate-bg-slide`;

  // Merge the default classes with the passed className
  const mergedClasses = `${defaultClasses} ${className && className}`;

  return (
    <MotionButton
      whileTap={{ scale: 0.85 }}
      disabled={disabled}
      className={mergedClasses}
      onClick={onClick}
    >
      {children}
    </MotionButton>
  );
};

export default DynamicPrimaryBtn;
