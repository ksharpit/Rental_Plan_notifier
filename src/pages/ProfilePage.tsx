import React, { useState } from 'react';
import { User, Settings, LogOut, Moon, Sun, Camera, Upload } from 'lucide-react';
import { User as UserType } from '../types';

interface ProfilePageProps {
  user: UserType;
  onLogout: () => void;
  onUpdateProfile: (user: UserType) => void;
  darkMode: boolean;
  onToggleDarkMode: (enabled: boolean) => void;
}

export function ProfilePage({ user, onLogout, onUpdateProfile, darkMode, onToggleDarkMode }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        const updatedUser = { ...editedUser, avatar: imageUrl };
        setEditedUser(updatedUser);
        onUpdateProfile(updatedUser);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    onUpdateProfile(editedUser);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center overflow-hidden">
              {editedUser.avatar ? (
                <img
                  src={editedUser.avatar}
                  alt={editedUser.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <User size={32} className="text-primary-600" />
              )}
            </div>
            <label className="absolute -bottom-1 -right-1 bg-primary-600 text-white p-1.5 rounded-full cursor-pointer hover:bg-primary-700 transition-colors">
              <Camera size={12} />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                  className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="email"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                  className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="tel"
                  value={editedUser.phone}
                  onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                  className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{editedUser.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">{editedUser.email}</p>
                <p className="text-gray-600 dark:text-gray-400">{editedUser.phone}</p>
              </div>
            )}
          </div>
          
          <button
            onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Settings</h3>
        
        <div className="space-y-1">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center space-x-3">
              {darkMode ? <Moon size={20} className="text-gray-700 dark:text-gray-300" /> : <Sun size={20} className="text-gray-700 dark:text-gray-300" />}
              <span className="font-medium text-gray-700 dark:text-gray-300">Dark Mode</span>
            </div>
            <button
              onClick={() => onToggleDarkMode(!darkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Sign Out */}
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors hover:bg-error-50 dark:hover:bg-error-900 text-error-600 dark:text-error-400"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}