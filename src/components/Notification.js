// src/components/Notification.js
import React, { useEffect } from 'react';

function Notification({ message, type, setNotification }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setNotification({ message: '', type: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, setNotification]);

  if (!message) return null;

  const notificationStyle = {
    padding: '10px',
    margin: '10px 0',
    border: `1px solid ${type === 'error' ? 'red' : 'green'}`,
    color: type === 'error' ? 'red' : 'green',
    backgroundColor: '#f9f9f9',
    position: 'relative'
  };

  return (
    <div style={notificationStyle}>
      {message}
      <button
        style={{ position: 'absolute', top: '5px', right: '10px', cursor: 'pointer' }}
        onClick={() => setNotification({ message: '', type: '' })}
      >
        X
      </button>
    </div>
  );
}

export default Notification;

