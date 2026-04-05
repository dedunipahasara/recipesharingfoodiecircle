import React from 'react';

const Dropdown = ({ trigger, children, position = "end", className = "" }) => {
  const positionClasses = {
    start: "dropdown-start",
    end: "dropdown-end",
    top: "dropdown-top",
    bottom: "dropdown-bottom",
  };

  return (
    <div className={`dropdown ${positionClasses[position]} ${className}`}>
      {/* The Trigger Element (Button/Avatar) */}
      <label tabIndex={0} className="cursor-pointer">
        {trigger}
      </label>

      {/* The Menu Content */}
      <ul 
        tabIndex={0} 
        className="dropdown-content z-[100] menu p-2 shadow-xl bg-base-100 rounded-box w-52 mt-4 border border-base-200"
      >
        {children}
      </ul>
    </div>
  );
};

export default Dropdown;