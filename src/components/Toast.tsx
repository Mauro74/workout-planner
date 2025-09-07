import React, { useEffect } from 'react';
import { ToastContainer } from '../styles';

interface ToastProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ isVisible, message, onClose, duration = 2000 }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  return (
    <ToastContainer isVisible={isVisible}>
      <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>✓</span>
      {message}
    </ToastContainer>
  );
};
