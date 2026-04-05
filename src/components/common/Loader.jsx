import React from 'react';

const Loader = ({ fullPage = false }) => {
  const containerClass = fullPage 
    ? "h-screen w-full flex items-center justify-center bg-base-100" 
    : "flex justify-center p-10";

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-dots loading-lg text-primary"></span>
        <p className="text-sm font-medium animate-pulse">Cooking up something delicious...</p>
      </div>
    </div>
  );
};

export default Loader;