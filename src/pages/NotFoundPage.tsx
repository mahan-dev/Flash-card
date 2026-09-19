import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link
        to="/"
        className="text-blue-600 hover:underline"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFoundPage;
