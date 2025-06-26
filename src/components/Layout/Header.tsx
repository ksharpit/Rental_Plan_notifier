import React from 'react';
import { Bell, Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
  showNotifications?: boolean;
  notificationCount?: number;
  onNotificationClick?: () => void;
}

export function Header({ title, showNotifications = false, notificationCount = 0, onNotificationClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 safe-area-top">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        </div>
        
        {showNotifications && (
          <button
            onClick={onNotificationClick}
            className="relative p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Bell size={20} />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-error-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </button>
        )}
      </div>
    </header>
  );
}