import React from "react";

interface btnProps {
  children: React.ReactNode;
  className?: string;
}

// we need to use importat in case any passed className won't work

const DynamicPrimaryBtn = ({ children, className }: btnProps) => {
  // Define the default classes
  const defaultClasses =
    "bg-black text-white py-2 rounded-xl flex items-center gap-2 justify-center px-6 font-medium";
  // Merge the default classes with the passed className
  const mergedClasses = `${defaultClasses} ${className && className}`;

  return <button className={mergedClasses}>{children}</button>;
};

export default DynamicPrimaryBtn;
