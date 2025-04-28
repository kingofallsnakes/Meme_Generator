// src/Toast.jsx
function Toast({ message }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#333',
      color: '#fff',
      padding: '12px 20px',
      borderRadius: '8px',
      boxShadow: '0px 2px 8px rgba(0,0,0,0.3)',
      zIndex: 1000,
      fontSize: '16px'
    }}>
      {message}
    </div>
  );
}

export default Toast;
