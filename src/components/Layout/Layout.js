import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <div style={{
        marginLeft: '250px',
        marginTop: '70px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        minHeight: 'calc(100vh - 70px)'
      }}>
        {children}
      </div>
    </div>
  );
}

export default Layout;
