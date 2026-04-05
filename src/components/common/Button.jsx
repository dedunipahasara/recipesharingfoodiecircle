import React from 'react';

const Button = ({ children, onClick, type = "button", variant = "primary", className = "", loading = false, disabled = false }) => {
  const variants = {
    primary: "btn-primary text-white",
    secondary: "btn-secondary",
    outline: "btn-outline btn-primary",
    ghost: "btn-ghost",
    danger: "btn-error text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn normal-case ${variants[variant]} ${className}`}
    >
      {loading ? <span className="loading loading-spinner"></span> : children}
    </button>
  );
};

export default Button;