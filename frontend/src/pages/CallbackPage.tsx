import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Here you would typically handle the access token.
    // For now, we'll just redirect to the home page.
    navigate('/');
  }, [navigate]);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default CallbackPage;