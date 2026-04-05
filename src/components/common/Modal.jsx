import React from 'react';

const Modal = ({ id, isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box relative max-w-2xl">
        <button 
          onClick={onClose} 
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >✕</button>
        {title && <h3 className="text-xl font-bold mb-4">{title}</h3>}
        <div className="py-2">
          {children}
        </div>
      </div>
      <div className="modal-backdrop bg-black/50" onClick={onClose}></div>
    </div>
  );
};

export default Modal;