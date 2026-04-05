import React from 'react';

const Input = ({ label, type = "text", placeholder, value, onChange, name, error, className = "" }) => {
  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text font-medium">{label}</span>
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input input-bordered w-full focus:input-primary ${error ? 'input-error' : ''} ${className}`}
      />
      {error && (
        <label className="label">
          <span className="label-text-alt text-error font-semibold">{error}</span>
        </label>
      )}
    </div>
  );
};

export default Input;