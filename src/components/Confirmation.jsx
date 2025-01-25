import { createContext, useContext, useState, useEffect } from 'react';

const ConfirmationContext = createContext();

export const ConfirmationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    visible: false,
    message: '',
    type: 'success'
  });

  const showNotification = (message, type = 'success') => {
    setNotification({
      visible: true,
      message,
      type
    });

    setTimeout(() => {
      setNotification(prev => ({
        ...prev,
        visible: false
      }));
    }, 2000);
  };

  return (
    <ConfirmationContext.Provider value={{ showNotification }}>
      {children}
      {notification.visible && (
        <div className={`confirmation-popup ${notification.type}`}>
          <div className="confirmation-content">
            <span className="confirmation-icon">
              {notification.type === 'success' ? '✓' : '!'}
            </span>
            <p>{notification.message}</p>
          </div>
        </div>
      )}
    </ConfirmationContext.Provider>
  );
};

export const useConfirmation = () => {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error('useConfirmation must be used within a ConfirmationProvider');
  }
  return context;
};