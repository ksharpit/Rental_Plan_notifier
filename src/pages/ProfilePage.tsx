import React from 'react';
import { ProfileHeader } from '../components/Profile/ProfileHeader';
import { RideHistory } from '../components/Profile/RideHistory';
import { User, Rental } from '../types';
import { Settings, HelpCircle, LogOut, Shield } from 'lucide-react';

interface ProfilePageProps {
  user: User;
  rentals: Rental[];
  onEditProfile: () => void;
}

export function ProfilePage({ user, rentals, onEditProfile }: ProfilePageProps) {
  const menuItems = [
    { icon: Settings, label: 'Account Settings', action: () => {} },
    { icon: Shield, label: 'Privacy & Security', action: () => {} },
    { icon: HelpCircle, label: 'Help & Support', action: () => {} },
    { icon: LogOut, label: 'Sign Out', action: () => {}, danger: true }
  ];

  return (
    <div className="space-y-6">
      <ProfileHeader user={user} onEdit={onEditProfile} />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account</h3>
        
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                item.danger
                  ? 'hover:bg-error-50 text-error-600'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <RideHistory rentals={rentals} />
    </div>
  );
}