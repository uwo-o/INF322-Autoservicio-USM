import React, { useEffect } from 'react';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface NotificationProps {
  message: string;
  show: boolean;
  onClose: () => void;
  duration?: number;
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  show,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-20 right-4 z-50 transform transition-all duration-300 ease-out">
      <div className="bg-white rounded-lg shadow-lg border border-green-200 p-4 flex items-center gap-3 min-w-[300px] max-w-md animate-[slideIn_0.3s_ease-out]">
        <div className="flex-shrink-0">
          <CheckCircleIcon className="w-6 h-6 text-usm-green" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition"
          aria-label="Cerrar notificación"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

