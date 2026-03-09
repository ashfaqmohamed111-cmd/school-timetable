import React from 'react';

function StatsCard({ title, value, icon, color, trend }) {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
      hover: {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
      }
    }}>
      <div>
        <div style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}>{title}</div>
        <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{value}</div>
        {trend && (
          <div style={{ 
            fontSize: '12px', 
            color: trend > 0 ? '#4caf50' : '#f44336',
            marginTop: '5px'
          }}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last week
          </div>
        )}
      </div>
      <div style={{
        backgroundColor: color || '#1976d2',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '30px',
        color: 'white'
      }}>
        {icon}
      </div>
    </div>
  );
}

export default StatsCard;
