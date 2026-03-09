import React, { useEffect } from 'react';

function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors = {
    success: { bg: '#d4edda', color: '#155724', icon: '✅' },
    error: { bg: '#f8d7da', color: '#721c24', icon: '❌' },
    warning: { bg: '#fff3cd', color: '#856404', icon: '⚠️' },
    info: { bg: '#d1ecf1', color: '#0c5460', icon: 'ℹ️' }
  };

  const style = colors[type] || colors.info;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: style.bg,
      color: style.color,
      padding: '12px 24px',
      borderRadius: '4px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      zIndex: 9999,
      animation: 'slideIn 0.3s ease'
    }}>
      <span>{style.icon}</span>
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          border: 'none',
          background: 'none',
          color: style.color,
          cursor: 'pointer',
          fontSize: '18px',
          marginLeft: '10px'
        }}
      >
        ✕
      </button>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default Toast;
