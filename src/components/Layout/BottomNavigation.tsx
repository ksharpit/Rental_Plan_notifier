import React from 'react';
import { Home, Map, CreditCard, Bell, User, Users } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  notificationCount?: number;
}

export function BottomNavigation({ activeTab, onTabChange, notificationCount = 0 }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'plans', label: 'Plans', icon: CreditCard },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'notifications', label: 'Alerts', icon: Bell, badge: notificationCount },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 safe-area-bottom">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map(({ id, label, icon: Icon, badge }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex flex-col items-center py-2 px-2 rounded-lg transition-colors relative ${
              activeTab === id
                ? 'text-primary-600 bg-primary-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="relative">
              <Icon size={18} />
              {badge > 0 && (
                <span className="absolute -top-2 -right-2 bg-error-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {badge > 9 ? '9+' : badge}
                </span>
              )}
            </div>
            <span className="text-xs mt-1 font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}