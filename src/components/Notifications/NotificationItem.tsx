import React from 'react';
import { Bell, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { Notification } from '../../types';
import { format } from 'date-fns';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

export function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  const getIcon = () => {
    switch (notification.type) {
      case 'warning':
        return <AlertTriangle size={20} className="text-warning-600" />;
      case 'success':
        return <CheckCircle size={20} className="text-success-600" />;
      case 'error':
        return <AlertTriangle size={20} className="text-error-600" />;
      default:
        return <Info size={20} className="text-primary-600" />;
    }
  };

  const getBgColor = () => {
    if (notification.read) return 'bg-gray-50';
    
    switch (notification.type) {
      case 'warning':
        return 'bg-warning-50';
      case 'success':
        return 'bg-success-50';
      case 'error':
        return 'bg-error-50';
      default:
        return 'bg-primary-50';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getBgColor()} ${
      notification.read ? 'border-gray-200' : 'border-current border-opacity-20'
    }`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className={`text-sm font-medium ${
                notification.read ? 'text-gray-700' : 'text-gray-900'
              }`}>
                {notification.title}
              </h4>
              <p className={`text-sm mt-1 ${
                notification.read ? 'text-gray-500' : 'text-gray-700'
              }`}>
                {notification.message}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {format(notification.createdAt, 'MMM dd, yyyy • h:mm a')}
              </p>
            </div>
            
            {!notification.read && (
              <button
                onClick={() => onMarkAsRead(notification.id)}
                className="ml-2 p-1 text-gray-400 hover:text-gray-600 rounded"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}