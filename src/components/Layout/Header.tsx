import React from 'react';
import { Bell } from 'lucide-react';

interface HeaderProps {
  title: string;
  showNotifications?: boolean;
  notificationCount?: number;
  onNotificationClick?: () => void;
  darkMode?: boolean;
}

export function Header({ title, showNotifications = false, notificationCount = 0, onNotificationClick, darkMode = false }: HeaderProps) {
  return (
    <header className={`shadow-sm border-b px-4 py-3 safe-area-top ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center space-x-3">
          <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h1>
        </div>
        
        {showNotifications && (
          <button
            onClick={onNotificationClick}
            className={`relative p-2 rounded-lg transition-colors ${
              darkMode 
                ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
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