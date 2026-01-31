import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        <span className="logo-icon">🛒</span>
        Shopping
      </Link>

      <div className="nav-buttons">
        <Link to="/cart" className="cart-btn">
          🛒 Cart ({getTotalItems()})
        </Link>
        {user ? (
          <>
            <span className="welcome-text">Hi, {user.name}</span>
            {isAdmin && (
              <Link to="/admin" className="nav-btn admin-btn">
                Admin
              </Link>
            )}
            <button onClick={handleLogout} className="nav-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-btn">
              Login
            </Link>
            <Link to="/register" className="nav-btn">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;