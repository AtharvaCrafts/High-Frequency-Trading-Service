import React from 'react';

const LoginPage = () => {
  const handleLogin = () => {
    window.location.href = 'https://kite.zerodha.com/connect/login?api_key=ev7o6c03k1fdwrjk&v=3';
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-body">
              <h1 className="card-title">Login</h1>
              <p className="card-text">Please login with your Zerodha account to continue.</p>
              <button className="btn btn-primary" onClick={handleLogin}>
                Login with Zerodha
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;