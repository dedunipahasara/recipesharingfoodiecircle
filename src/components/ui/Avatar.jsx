import React from 'react';

const Avatar = ({ src, alt, size = "md", online = false, border = false }) => {
  const sizeClasses = {
    xs: "w-8",
    sm: "w-10",
    md: "w-12",
    lg: "w-16",
    xl: "w-24",
    "2xl": "w-32"
  };

  return (
    <div className={`avatar ${online ? 'online' : ''}`}>
      <div className={`${sizeClasses[size]} rounded-full ${border ? 'ring ring-primary ring-offset-base-100 ring-offset-2' : ''}`}>
        <img 
          src={src || "https://api.dicebear.com/7.x/avataaars/svg?seed=Foodie"} 
          alt={alt || "User Profile"} 
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Avatar;