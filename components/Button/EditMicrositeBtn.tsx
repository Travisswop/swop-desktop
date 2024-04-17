import React from "react";

interface btnProps {
  children: React.ReactNode;
  className?: string;
}

// we need to use importat in case any passed className won't work

const EditMicrositeBtn = ({ children, className }: btnProps) => {
  // Define the default classes
  const defaultClasses =
    "bg-white px-6 py-1.5 rounded-full flex gap-2 items-center text-gray-500 font-medium border border-gray-200";
  // Merge the default classes with the passed className
  const mergedClasses = `${defaultClasses} ${className && className}`;

  console.log(mergedClasses);

  return <button className={mergedClasses}>{children}</button>;
};

export default EditMicrositeBtn;
