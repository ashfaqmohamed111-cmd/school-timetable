import React from 'react';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { title: 'Total Teachers', value: '15', icon: '👨🏫', color: '#1976d2' },
    { title: 'Total Classes', value: '24', icon: '📚', color: '#2e7d32' },
    { title: 'Total Subjects', value: '32', icon: '📖', color: '#ed6c02' },
    { title: 'Today\'s Classes', value: '8', icon: '📅', color: '#9c27b0' },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: '30px' }}>Dashboard</h2>
      
      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ color: '#666', fontSize: '14px' }}>{stat.title}</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{stat.value}</div>
            </div>
            <div style={{
              backgroundColor: stat.color,
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '30px',
              color: 'white'
            }}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Welcome Card */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '30px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h3>Welcome back, {user?.name}!</h3>
        <p>You are logged in as <strong>{user?.role}</strong></p>
        <p style={{ color: '#666', marginTop: '20px' }}>
          Use the sidebar to navigate through the system.
        </p>
      </div>

      {/* Quick Actions & Schedules widget */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        marginTop: '30px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h4 style={{ marginBottom: '15px' }}>Quick Actions</h4>
          <button className="quick-action-button">📅 Mark Attendance</button>
          <button className="quick-action-button">👥 Add Teacher</button>
          <button className="quick-action-button">📚 New Subject</button>
          <button className="quick-action-button">⏰ Request Substitute</button>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h4 style={{ marginBottom: '15px' }}>Today's Schedule</h4>
          <div className="schedule-item">
            <span>8:00 - 9:00</span>
            <span>10A - Mathematics</span>
          </div>
          <div className="schedule-item">
            <span>9:00 - 10:00</span>
            <span>11B - Physics</span>
          </div>
          <div className="schedule-item">
            <span>10:00 - 11:00</span>
            <span>12C - Chemistry</span>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h4 style={{ marginBottom: '15px' }}>Pending Approvals</h4>
          <div className="approval-item">
            <span>Leave Request: John Doe</span>
            <span style={{ color: '#ff9800' }}>Pending</span>
          </div>
          <div className="approval-item">
            <span>Substitution: Class 10A</span>
            <span style={{ color: '#ff9800' }}>Pending</span>
          </div>
          <div className="approval-item">
            <span>Attendance: 3 pending</span>
            <span style={{ color: '#f44336' }}>Action needed</span>
          </div>
        </div>
      </div>

      <style>{`
        .quick-action-button {
          width: 100%;
          padding: 10px;
          margin-bottom: 8px;
          background-color: #f5f5f5;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
          text-align: left;
          transition: background 0.3s;
        }
        .quick-action-button:hover {
          background-color: #e0e0e0;
        }
        .schedule-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }
        .approval-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
