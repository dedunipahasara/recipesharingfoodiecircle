import React from 'react';

const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded mt-auto">
      <div className="grid grid-flow-col gap-4">
        <span className="font-bold text-xl text-primary">FoodieCircle</span>
      </div> 
      <div>
        <p>Copyright © 2026 - All right reserved by FoodieCircle Ltd</p>
        <p className="text-xs opacity-50 mt-2 italic">Share your taste with the world.</p>
      </div>
    </footer>
  );
};

export default Footer;