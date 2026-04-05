import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <span className="text-9xl mb-4">🥣</span>
      <h1 className="text-4xl font-black mb-2 text-primary">404 - Kitchen Closed</h1>
      <p className="text-lg opacity-60 mb-8 italic">We couldn't find the page you were looking for.</p>
      <Link to="/" className="btn btn-primary px-10 rounded-full">Go Back Home</Link>
    </div>
  );
};

export default NotFound;