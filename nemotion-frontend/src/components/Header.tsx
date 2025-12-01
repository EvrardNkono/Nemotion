import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from './../assets/NEmotion-logo.png';
import accountIcon from './../assets/icon.png';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="NEmotion Logo" className="logo-img"/>
        <span className="logo-name">NEmotion</span>
      </div>

      <nav className="nav-menu">
        <Link to="/">Home</Link>
        <Link to="/how-it-works">How It Works</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/faq">FAQ</Link>
      </nav>

      <div className="header-actions">
        <button 
          className="get-started-btn"
          onClick={() => navigate('/trade')}
        >
          Get Started
        </button>

        <div className="account">
          <img src={accountIcon} alt="Account" className="account-icon" />
          <span className="account-name">John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
