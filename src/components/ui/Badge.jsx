import React from 'react';

const Badge = ({ children, variant = "ghost", size = "md", className = "" }) => {
  const variants = {
    primary: "badge-primary",
    secondary: "badge-secondary",
    accent: "badge-accent",
    ghost: "badge-ghost",
    outline: "badge-outline",
    error: "badge-error text-white",
  };

  const sizes = {
    sm: "badge-sm",
    md: "badge-md",
    lg: "badge-lg",
  };

  return (
    <div className={`badge ${variants[variant]} ${sizes[size]} font-semibold ${className}`}>
      {children}
    </div>
  );
};

export default Badge;