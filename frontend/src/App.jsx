import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import SubmitFeedback from './pages/SubmitFeedback';
import MyFeedback from './pages/MyFeedback';
import AdminDashboard from './pages/AdminDashboard';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

function App() {
  return (
    <Router>
      {localStorage.getItem('token') && (
        <button onClick={handleLogout}>Logout</button>
      )}
      <Routes>
        <Route path="/" element={
          <div>
            <h1>Welcome to the feedback terminal</h1>
            <Link to="/login">
              <button>
                Login
              </button>
            </Link>
            <Link to="/register">
              <button>
                Register
              </button>
            </Link>
          </div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/submit"
          element={
            <PrivateRoute>
              <SubmitFeedback />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-feedback"
          element={
            <PrivateRoute>
              <MyFeedback />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
