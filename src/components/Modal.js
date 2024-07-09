// src/components/Modal.js
import React from 'react';
import './Modal.css';

function Modal({ isOpen, closeModal, confirmAction, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        <button onClick={confirmAction}>Confirmer</button>
        <button onClick={closeModal}>Annuler</button>
      </div>
    </div>
  );
}

export default Modal;
