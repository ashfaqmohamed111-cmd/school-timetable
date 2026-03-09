import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const navbarStyle = {
    backgroundColor: 'white',
    padding: '10px 20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: '250px',
    right: 0,
    zIndex: 1000
  };

  return (
    <div style={navbarStyle}>
      <div>
        <h3 style={{ margin: 0, color: '#333' }}>School Timetable Management</h3>
      </div>
      
      <div style={{ position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            padding: '5px 10px',
            borderRadius: '4px',
            backgroundColor: showDropdown ? '#f0f0f0' : 'transparent'
          }}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span style={{ fontSize: '20px' }}>👤</span>
          <div>
            <div style={{ fontWeight: 'bold' }}>{user?.name}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{user?.role}</div>
          </div>
          <span style={{ fontSize: '12px' }}>{showDropdown ? '▲' : '▼'}</span>
        </div>

        {showDropdown && (
          <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            backgroundColor: 'white',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            borderRadius: '4px',
            width: '200px',
            marginTop: '5px'
          }}>
            <div style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
              <div><strong>{user?.email || 'user@school.com'}</strong></div>
            </div>
            <div
              style={{ padding: '10px', cursor: 'pointer', hover: { backgroundColor: '#f5f5f5' } }}
              onClick={() => {
                logout();
                setShowDropdown(false);
              }}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
