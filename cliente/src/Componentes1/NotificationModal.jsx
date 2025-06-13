import React from 'react';
import './NotificationModal.css';

const NotificationModal = ({ isOpen, message, onClose, type = 'success' }) => {
  if (!isOpen) return null;

  return (
    <div className="notification-modal-overlay">
      <div className={`notification-modal ${type}`}>
        <div className="notification-content">
          <h3>{type === 'success' ? '¡Éxito!' : 'Error'}</h3>
          <p className="notification-message">{message}</p>
          <button className="btn-cerrar" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;