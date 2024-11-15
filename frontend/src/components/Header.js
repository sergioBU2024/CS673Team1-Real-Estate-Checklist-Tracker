import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApplicationsContext } from '../contexts/ApplicationsContext';  // Import the context
import './Header.css';

function Header({ username = 'Mr. Abraham Lincoln' }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  
  const { clearApplications } = useContext(ApplicationsContext);  // Access setApplications from the context

  // Toggle dropdown visibility
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Navigation handlers
  const handleSettings = () => navigate('/settings');
  const handleLogout = () => {
    clearApplications();  // Clear applications on logout
    navigate('/');        // Redirect to the home page
  };

  return (
    <header className="header">
      <div className="logo-header">
        <img src="/logo.png" alt="RealList Logo" />
        <div className="logo-text">
          <h1>RealList</h1>
          <p>Unlock simplicity in your rental journey!</p>
        </div>
      </div>

      <div className="welcome-text" onClick={toggleDropdown} ref={dropdownRef}>
        <p className="welcome"><strong>Welcome,</strong></p>
        <p className="username">{username}</p>
        <span className={`arrow ${dropdownOpen ? 'open' : ''}`}>▼</span>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <ul>
              <li onClick={handleSettings}>Settings</li>
              <li onClick={handleLogout}>Log Out</li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
