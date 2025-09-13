import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '/workspaces/typescript-node/High-Frequency-Trading-Service/frontend/src/pages/HomePage.tsx';
import LoginPage from '/workspaces/typescript-node/High-Frequency-Trading-Service/frontend/src/pages/LoginPage.tsx';
import CallbackPage from '/workspaces/typescript-node/High-Frequency-Trading-Service/frontend/src/pages/CallbackPage.tsx';
import './App.css';

// A simple check for authentication.
// In a real app, this would be more sophisticated.
const isAuthenticated = () => {
  // For now, we'll just check if we are on the login page.
  return window.location.pathname !== '/login';
};

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/trade/redirect" element={<CallbackPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
