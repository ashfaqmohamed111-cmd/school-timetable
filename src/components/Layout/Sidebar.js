import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Sidebar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showClasses, setShowClasses] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 
                   'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 
                   'Class 11', 'Class 12'];
  const sections = ['A', 'B', 'C', 'D'];

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Timetable', path: '/timetable', icon: '📅' },
    { name: 'Teachers', path: '/teachers', icon: '👨🏫' },
    { name: 'Subjects', path: '/subjects', icon: '📚' },
    { name: 'Attendance', path: '/attendance', icon: '✅' },
    { name: 'Substitutions', path: '/substitutions', icon: '⏰' },
    { name: 'Reports', path: '/reports', icon: '📊' },
  ];

  // Filter menu items based on user role
  const filteredMenu = menuItems.filter(item => {
    if (user?.role === 'teacher') {
      return ['Dashboard', 'Timetable', 'Attendance', 'Substitutions'].includes(item.name);
    }
    return true;
  });

  const sidebarStyle = {
    width: '250px',
    height: '100vh',
    backgroundColor: '#1e1e2f',
    color: 'white',
    position: 'fixed',
    left: 0,
    top: 0,
    overflowY: 'auto'
  };

  const menuItemStyle = {
    padding: '12px 20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: 'background 0.3s'
  };

  return (
    <div style={sidebarStyle}>
      {/* Logo/Title */}
      <div style={{ padding: '20px', borderBottom: '1px solid #333', textAlign: 'center' }}>
        <h3 style={{ margin: 0 }}>School Manager</h3>
        <p style={{ margin: '5px 0 0', fontSize: '12px', color: '#aaa' }}>{user?.role}</p>
      </div>

      {/* Classes Dropdown */}
      <div>
        <div 
          style={menuItemStyle}
          onClick={() => setShowClasses(!showClasses)}
        >
          <span>📚</span>
          <span style={{ flex: 1 }}>Classes</span>
          <span>{showClasses ? '▼' : '▶'}</span>
        </div>
        
        {showClasses && (
          <div style={{ padding: '10px 20px 20px 40px', backgroundColor: '#2a2a3a' }}>
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '10px',
                borderRadius: '4px',
                border: 'none'
              }}
            >
              <option value="">Select Class</option>
              {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
            
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '10px',
                borderRadius: '4px',
                border: 'none'
              }}
            >
              <option value="">Select Section</option>
              {sections.map(sec => (
                <option key={sec} value={sec}>Section {sec}</option>
              ))}
            </select>
            
            <button
              onClick={() => navigate(`/timetable?class=${selectedClass}&section=${selectedSection}`)}
              style={{
                width: '100%',
                padding: '8px',
                backgroundColor: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              View Schedule
            </button>
          </div>
        )}
      </div>

      {/* Menu Items */}
      {filteredMenu.map(item => (
        <div
          key={item.name}
          style={menuItemStyle}
          onClick={() => navigate(item.path)}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2a2a3a'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <span>{item.icon}</span>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
